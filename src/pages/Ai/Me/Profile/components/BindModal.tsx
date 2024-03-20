import {
  InputCaptchaFormItem,
  captchType,
} from '@/pages/Login/components/FormItems';
import services from '@/services/ai';
import { EMAILREG, PHONE } from '@/utils/reg';
import {
  ProForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';

export const BindModal = ({
  bindModalVisible,
  onCancel,
  codeType,
}: {
  bindModalVisible: boolean;
  onCancel: any;
  codeType: CodeType;
}) => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const refreshCaptcha = async () => {
    const data = await services.LoginController.captcha({});
    const imageURL = data.base64;
    setCode(data.code);
    setCaptchaImg('data:image/;base64, ' + imageURL);
  };

  return (
    <Modal open={bindModalVisible} footer={[]} onCancel={onCancel}>
      <div style={{ marginTop: 32 }}></div>
      <ProForm
        form={form}
        layout="horizontal"
        onFinish={async (values) => {
          let params = { ...values, ...{ captchaCode: code } };
		  const fnMap = {
			"phone": "bindPhone",
			"email": "bindEmail",
		  }
            try {
              await (services.LoginController as any)[fnMap[codeType]](params);
            } catch (error) {
              refreshCaptcha();
            }
        }}
        submitter={{
          render: (props) => {
            return [
              <Button type="primary" onClick={() => props.form?.submit?.()}>
                立即绑定
              </Button>,
            ];
          },
        }}
      >
        <AccountFormItem codeType={codeType}></AccountFormItem>
        <CaptchaFormItem type="bind" codeType={codeType}></CaptchaFormItem>
        <InputCaptchaFormItem
          refreshCaptcha={refreshCaptcha}
          captchaImg={captchaImg}
        ></InputCaptchaFormItem>
      </ProForm>
    </Modal>
  );
};

export type CodeType = 'phone' | 'email';

export const CaptchaFormItem = ({
  type,
  codeType,
}: {
  type: captchType;
  codeType: CodeType;
}) => {
  let props: any = {};
  if (codeType === 'phone') {
    props = {
      phoneName: 'phone',
      onGetCaptcha: (phone: string) => {
        return services.LoginController.phoneSend({
          type,
          phone,
        });
      },
    };
  }
  if (codeType === 'email') {
    props = {
      phoneName: 'email',
      onGetCaptcha: (email: string) => {
        return services.LoginController.sendEmail({
          type,
          email,
        });
      },
    };
  }
  return (
    <ProFormCaptcha
      label={'账户验证码'}
      placeholder={'请输入验证码'}
      rules={[{ required: true, message: '请输入验证码' }]}
      name="code"
      {...props}
    />
  );
};

export const AccountFormItem = ({ codeType }: { codeType: CodeType }) => {
  let props: any = {};
  if (codeType === 'phone') {
    props = {
      rules: [
        { required: true, message: '请输入手机号码' },
        { pattern: PHONE, message: '请输入正确的手机号码' },
      ],
      name: 'phone',
      placeholder: '请输入手机号码',
    };
  }
  if (codeType === 'email') {
    props = {
      rules: [
        { required: true, message: '请输入邮箱号码' },
        { pattern: EMAILREG, message: '请输入正确的邮箱号码' },
      ],
      name: 'email',
      placeholder: '请输入邮箱号码',
    };
  }
  return <ProFormText label={'账号'} {...props}></ProFormText>;
};
