import services from '@/services/ai';
import { getUserInfoSet } from '@/utils';
import { EMAILREG, PHONE, PHONEOREMAILREG } from '@/utils/reg';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import {useNavigate, useModel} from '@umijs/max';
import { Button, Form,  } from 'antd';
import { useEffect, useState } from 'react';
import {AccountFormItem, AgreeFormItem, InputCaptchaFormItem} from './FormItems';

export const EmailLogin = () => {
  const [form] = Form.useForm();
  const [code, setCode] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const navigate = useNavigate();
  const { refresh } = useModel("@@initialState")

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
        try {
          let data = await services.LoginController.passwordLogin(params);
          localStorage.setItem('token', data?.token || '');
          getUserInfoSet();
		  refresh()
          navigate('/');
        } catch (error) {
          refreshCaptcha();
        }
      }}
      submitter={{
        render: (props) => {
          return [
            <Button type="primary" onClick={() => props.form?.submit?.()}>
              立即登录
            </Button>,
          ];
        },
      }}
    >
      <AccountFormItem type={'login'}></AccountFormItem>
      <ProFormText.Password
        placeholder={'请输入密码'}
        rules={[{ required: true, message: '请输入密码' }]}
        label="密码"
        name="password"
      />
	  <InputCaptchaFormItem refreshCaptcha={refreshCaptcha} captchaImg={captchaImg}></InputCaptchaFormItem>
      <AgreeFormItem
      ></AgreeFormItem>
    </ProForm>
  );
};
