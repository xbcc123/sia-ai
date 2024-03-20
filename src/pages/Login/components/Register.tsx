import services from '@/services/ai';
import { EMAILREG, PHONE } from '@/utils/reg';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  AccountFormItem,
  AgreeFormItem,
  CaptchaFormItem,
  InputCaptchaFormItem,
} from './FormItems';
import {createStyles} from 'antd-style';

export const Register = ({
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

  const urlParams = useRef<any>();
  useEffect(() => {
    urlParams.current = new URLSearchParams(location.search);
    if (
      urlParams.current.get('type') === 'register' &&
      urlParams.current.get('code')
    ) {
      form.setFieldsValue({
        inviteCode: urlParams.current.get('code'),
      });
    }
  }, []);

  // 刷新验证码
  const refreshCaptcha = async () => {
    const data = await services.LoginController.captcha({});
    const imageURL = data.base64;
    setCode(data.code);
    setCaptchaImg('data:image/;base64, ' + imageURL);
  };

  //   注册
  const register = async (values: any) => {
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
      await services.LoginController.emailRegister(params);
      onChangePage('login');
    } catch (error) {}
  };

  return (
    <div style={{}}>
      <ProForm
        form={form}
        layout="horizontal"
        onFinish={register}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type="primary" onClick={() => props.form?.submit?.()}>
                立即注册
              </Button>,
            ];
          },
        }}
      >
        <AccountFormItem type={'register'}></AccountFormItem>
        <ProFormText.Password
          placeholder={'请输入密码'}
          rules={[{ required: true, message: '请输入密码' }]}
          label="密码"
          name="password"
        />
        <CaptchaFormItem type='signIn'></CaptchaFormItem>
        <InputCaptchaFormItem
          refreshCaptcha={refreshCaptcha}
          captchaImg={captchaImg}
        ></InputCaptchaFormItem>
        <ProFormText
          name="inviteCode"
          label={'邀请码'}
          placeholder={'邀请码（非必填）'}
        ></ProFormText>
        <AgreeFormItem></AgreeFormItem>
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