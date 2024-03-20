import { EMAILREG, PHONE, PHONEOREMAILREG } from '@/utils/reg';
import {ProFormCheckbox, ProFormText, ProFormCaptcha} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {theme, Modal} from 'antd';
import { createStyles } from 'antd-style';
import services from '@/services/ai';
import {useState} from 'react';

const useStyles = createStyles(() => {
  return {
    color1: {
      cursor: 'pointer',
    },
  };
});

type AccountFormItemType = 'login' | 'register' | 'codeLogin'

// 账号
export const AccountFormItem = ({type}: {type: AccountFormItemType}) => {
  const { initialState } = useModel('@@initialState');
  const { loginSetting } = initialState;
  let props = {};
  const map = {
	login: {
		phoneVerity: loginSetting?.openPhone,
		emailVerity: loginSetting?.openEmail
	},
	register: {
		phoneVerity: loginSetting?.openPhone,
		emailVerity: loginSetting?.openEmail	
	},
	codeLogin: {
		phoneVerity: loginSetting?.openPhone,
		emailVerity: loginSetting?.openEmail	
	}
  }
  const phoneVerity = map[type].phoneVerity
  const emailVerity = map[type].emailVerity
  if (phoneVerity && emailVerity) {
    props = {
      rules: [
        { required: true, message: '请输入手机/邮箱号码' },
        { pattern: PHONEOREMAILREG, message: '请输入正确的手机/邮箱号码' },
      ],
      name: 'account',
      placeholder: '请输入手机/邮箱号码',
    };
  } else if (phoneVerity) {
    props = {
      rules: [
        { required: true, message: '请输入手机号码' },
        { pattern: PHONE, message: '请输入正确的手机号码' },
      ],
      name: 'phone',
      placeholder: '请输入手机号码',
    };
  } else if (emailVerity) {
    props = {
      rules: [
        { required: true, message: '请输入邮箱号码' },
        { pattern: EMAILREG, message: '请输入正确的邮箱号码' },
      ],
      name: 'email',
      placeholder: '请输入邮箱号码',
    };
  }
  return <ProFormText  label={'账号'}  {...props}></ProFormText>;
};

// 同意协议
export const AgreeFormItem = () => {
  const { token } = theme.useToken();
  const { styles } = useStyles();
  const [agreementModalVisible, setAgreementModalVisible] = useState(false);
  const [policyModalVisible, setPolicyModalVisible] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { protocolConfig } = initialState;

  return (<>
    <ProFormCheckbox
      name="agree"
      rules={[{ required: true, message: '请勾协议' }]}
    >
      我已阅读并同意{' '}
      <span
        className={styles.color1}
        style={{
          color: token.colorPrimary,
        }}
        onClick={() => setAgreementModalVisible(true)}
      >
        《用户协议》
      </span>
      和
      <span
        onClick={() => setPolicyModalVisible(true)}
        className={styles.color1}
        style={{
          color: token.colorPrimary,
        }}
      >
        《隐私协议》
      </span>
    </ProFormCheckbox>
	<Modal
        title="用户协议"
		styles={{
			body: {
				whiteSpace: 'pre-wrap'
			}
		}}
        open={agreementModalVisible}
        onCancel={() => setAgreementModalVisible(false)}
        footer={[]}
      >
           <div dangerouslySetInnerHTML={{__html: protocolConfig?.user || ''}}></div>
      </Modal>
      <Modal
        title="隐私协议"
		styles={{
			body: {
				whiteSpace: 'pre-wrap'
			}
		}}        open={policyModalVisible}
        onCancel={() => setPolicyModalVisible(false)}
        footer={[]}
      >
       <div dangerouslySetInnerHTML={{__html: protocolConfig?.privacy || ''}}></div>
      </Modal>
  </>)
};

// 发送验证码
export const CaptchaFormItem = ({type = "login"}: {type:captchType }) => {
	const { initialState } = useModel('@@initialState');
	const { loginSetting } = initialState;
	let props: any = {};
    if (loginSetting?.openPhone && loginSetting?.openEmail) {
      props = {
		phoneName: "account",
		onGetCaptcha: (account: string) => {
			if (PHONE.test(account)) {
				return services.LoginController.phoneSend({
					type,
					phone: account,
				});
			}
			if (EMAILREG.test(account)) {
				return services.LoginController.sendEmail({
					type,
					email: account,
				});
			}
		}
      };
    } else if (loginSetting?.openPhone) {
      props = {
		phoneName: "phone",
		onGetCaptcha: (phone: string) => {
			return services.LoginController.phoneSend({
				type,
				phone,
			});
		}
      };
    } else if (loginSetting?.openEmail) {
      props = {
		phoneName: "email",
		onGetCaptcha: (email: string) => {
			return services.LoginController.sendEmail({
				type,
				email,
			});
		}
      };
    }
    return   <ProFormCaptcha
        label={'账户验证码'}
        placeholder={'请输入验证码'}
        rules={[{ required: true, message: '请输入验证码' }]}
        name="code"
        phoneName="email"
		{...props}
      />
}

// 文字验证码
export const InputCaptchaFormItem = ({refreshCaptcha, captchaImg}: {
	refreshCaptcha: () => void;
	captchaImg: string
}) => {
	return  <ProFormText
	fieldProps={{
	  suffix: (
		<div
		  onClick={() => {
			refreshCaptcha();
		  }}
		>
		  <img style={{ height: 20 }} src={captchaImg}></img>{' '}
		</div>
	  ),
	}}
	name="captcha"
	label={'验证码'}
	placeholder={'请输入验证码'}
	rules={[{ required: true, message: '请输入验证码' }]}
  ></ProFormText>
}


// 验证码类型
export type captchType =  "signIn" | "login" | "bind" | "back"