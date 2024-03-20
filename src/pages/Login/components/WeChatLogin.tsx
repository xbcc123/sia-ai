import services from '@/services/ai';
import {useModel, useNavigate} from '@umijs/max';
import {Modal, message} from 'antd';
import { useEffect, useRef, useState } from 'react';
import {getUserInfoSet} from '@/utils';

export const WeChatLoginModal = ({visible, type, onCancel, bindSucess}: {visible: boolean, type: 'login' | 'bind', onCancel:() => void, bindSucess?: () => void}) => {
	const { initialState, refresh } = useModel("@@initialState")
  const [info, setInfo] = useState({
	url: '',
	verifyCode: '',
	code: '',
  });
  const timerRef = useRef<any>()
  const navigate = useNavigate();

  const { setting } = initialState

  useEffect(() => {
	if(visible) {
		getData();
	}
	return () => {
		clearInterval(timerRef.current)
	}
  }, [visible]);

    
  const typeMap = {
	login: {
		title: '微信登录'
	},
	bind: {
		title: '微信绑定'
	}
  }

  const getData = async () => {
    try {
      const data = await services.LoginController.preLoginWechatPublic();
	  setInfo(data)
	  if(type === "bind"){
		refBindStatus(data?.code)
	  }
	  if(type === "login") {
		refToken(data?.code)
	  }
    } catch (error) {
    }
  };
  
  const refBindStatus =  async (code: number) => {
	timerRef.current = setInterval(async () => {
		try {
			const data = await services.LoginController.bindWechat({
			  code
			});
			if(data) {
				// 绑定成功
				message.success("绑定成功")
				bindSucess?.()
			}
		  } catch (error) {
			onCancel?.()
		  }
	}, 2000)
  };

  const refToken = async (code: number) => {
	timerRef.current = setInterval(async () => {
		try {
			const data = await services.LoginController.wechatToken({
			  code
			});
			if(data?.token) {
				localStorage.setItem('token', data?.token || '');
				getUserInfoSet();
				refresh()
				navigate('/');
				clearInterval(timerRef.current)
			}
		  } catch (error) {
		  }
	}, 2000)
  };


  return (
    <Modal width={300} title={typeMap[type].title} open={visible} footer={[]} onCancel={onCancel}>
	  <div style={{marginBottom: 8}}></div>
      <img style={{ display: 'block', width: 200, height: 200, margin: '0 auto' }} src={`${setting?.domain}${info?.url}`} alt="" />
	  <div style={{marginTop: 8, textAlign: 'center', fontWeight: 'bold'}}>
		关注后输入验证码 <span style={{color: 'red'}}>{info?.verifyCode}</span>
	  </div>
    </Modal>
  );
};
