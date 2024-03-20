import services from '@/services/ai';
import { getUserInfoSet } from '@/utils';
import { ProForm } from '@ant-design/pro-components';
import {useNavigate, useModel} from '@umijs/max';
import { Button, Form, theme } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';
import {
	AccountFormItem,
  AgreeFormItem,
  CaptchaFormItem,
  InputCaptchaFormItem,
} from './FormItems';
import {EMAILREG, PHONE} from '@/utils/reg';

export const EmailCodeLogin = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const { refresh } = useModel("@@initialState")
  const navigate = useNavigate();

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
    <ProForm
      form={form}
      layout="horizontal"
      onFinish={async (values) => {
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
        let data: {
          token?: string;
        } = {};
        try {
          data = await services.LoginController.verifyCode(params);
          localStorage.setItem('token', data?.token || '');
          getUserInfoSet();
		  refresh()
          navigate('/');
        } catch (error) {
          refreshCaptcha();
        }
      }}
      submitter={{
        render: (props, doms) => {
          return [
            <Button type="primary" onClick={() => props.form?.submit?.()}>
              立即登录
            </Button>,
          ];
        },
      }}
    >
      <AccountFormItem type={'codeLogin'}></AccountFormItem>
      <CaptchaFormItem type='login'></CaptchaFormItem>
      <InputCaptchaFormItem
        refreshCaptcha={refreshCaptcha}
        captchaImg={captchaImg}
      ></InputCaptchaFormItem>
      <AgreeFormItem
      ></AgreeFormItem>
    </ProForm>
  );
};

const useStyles = createStyles(() => {
  return {
    color1: {
      cursor: 'pointer',
    },
  };
});
