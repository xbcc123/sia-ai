import services from '@/services/ai';
import { EMAILREG, PHONE } from '@/utils/reg';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Typography, theme } from 'antd';
import { useEffect, useState } from 'react';
import {
  AccountFormItem,
  CaptchaFormItem,
  InputCaptchaFormItem,
} from './FormItems';
import {createStyles} from 'antd-style';

export const RetrievePassword = ({
  onChangePage,
}: {
  onChangePage: (page: 'login' | 'register') => void;
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [captchaImg, setCaptchaImg] = useState('');
  const { token } = theme.useToken();
  const [code, setCode] = useState('');

  useEffect(() => {
    refreshCaptcha();
  }, []);

  // 刷新验证码
  const refreshCaptcha = async () => {
    const data = await services.LoginController.captcha({});
    const imageURL = data.base64;
    setCode(data.code);
    setCaptchaImg('data:image/;base64, ' + imageURL);
  };

  //  找回密码
  return (
    <div
      style={{
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography.Title style={{ marginBottom: 16 }} level={4}>
          找回密码
        </Typography.Title>
      </div>
      <ProForm
        form={form}
        layout="horizontal"
        onFinish={async (values: any) => {
          if (values?.account) {
            if (PHONE.test(values.account)) {
              values.phone = values.account;
            }
            if (EMAILREG.test(values.account)) {
              values.email = values.account;
            }
            delete values.account;
          }
          let params = { ...values, ...{ captchaCode: code } };
          try {
            await services.LoginController.passwordForget(params);
            onChangePage('login');
          } catch (error) {}
        }}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type="primary" onClick={() => props.form?.submit?.()}>
                重置密码
              </Button>,
            ];
          },
        }}
      >
        <AccountFormItem type={'login'}></AccountFormItem>
        <ProFormText.Password
          placeholder={'请输入密码'}
          rules={[{ required: true, message: '请输入密码' }]}
          label="新密码"
          name="password"
        />
        <CaptchaFormItem type="back"></CaptchaFormItem>
        <InputCaptchaFormItem
          refreshCaptcha={refreshCaptcha}
          captchaImg={captchaImg}
        ></InputCaptchaFormItem>
      </ProForm>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 32,
        }}
      >
        <div>
          已有账号？{' '}
          <span
            className={styles.color1}
            style={{
              color: token.colorPrimary,
            }}
            onClick={() => onChangePage('login')}
          >
            立即登录
          </span>
        </div>
      </div>
    </div>
  );
};


const useStyles = createStyles(() => {
	return {
	  color1: {
		cursor: 'pointer',
	  },
	};
  });