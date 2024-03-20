import {ModalForm} from '@ant-design/pro-components';
import {Form, Button} from 'antd';
import {useSnapshot} from '@umijs/max';
import {globalModal} from '@/valtioStore/globalModal';
import { InputCaptchaFormItem} from '@/pages/Login/components/FormItems';
import services from '@/services/ai';
import {useEffect, useState} from 'react';
import { AccountFormItem, CaptchaFormItem } from '@/pages/Ai/Me/Profile/components/BindModal';

export const BindModal = () => {
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
  
  let { bindModalOpen, bindType } = useSnapshot(globalModal);
  
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title=""
      form={form}
	  open={bindModalOpen}
	  width={400}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
		closeIcon: null
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
      submitTimeout={2000}
      onFinish={async (values) => {
		let params = { ...values, ...{ captchaCode: code } };
		const fnMap: any = {
		  "phone": "bindPhone",
		  "email": "bindEmail",
		}
		  try {
			await (services.LoginController as any)[fnMap[bindType]](params);
			globalModal.bindModalOpen = false
			window.location.reload()
		  } catch (error) {
			refreshCaptcha();
		  }
        return true;
      }}
    >
        <AccountFormItem codeType={bindType}></AccountFormItem>
        <CaptchaFormItem type="bind" codeType={bindType}></CaptchaFormItem>
        <InputCaptchaFormItem
          refreshCaptcha={refreshCaptcha}
          captchaImg={captchaImg}
        ></InputCaptchaFormItem>
    </ModalForm>
  );
};

