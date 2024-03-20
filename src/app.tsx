import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RequestConfig } from '@umijs/max';
import 'animate.css';
import { Modal, message } from 'antd';
import { register } from 'swiper/element/bundle';
import './app.less';
import { ThemeProviderGlobal } from './components/ThemeProviderGlobal/index';
import { getMenusConfig } from './services/main/CommonController';
import { IGlobalInfo } from './types/index';
import { isLogin, saltAndHash } from './utils';
import {
  getGlobalScript,
  getGlobalSet,
  getLoginConfig,
  getProtocolConfig,
  getUserInfo,
} from './utils/api';
import {globalModal} from '@/valtioStore/globalModal';

library.add(fas, fab, far);

register();

const { BASE_URL } = process.env;

// 运行时配置
export const request: RequestConfig = {
  //   timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
  //请求拦截器
  requestInterceptors: [
    (url: string, options: any) => {
      options.headers!['x-dm'] = saltAndHash(location.origin, 'SiaAi@20!2*3#');
      const token = window.localStorage.getItem('token');
      if (token) {
        options.headers!['x-token'] = token;
      }
      return { url, options };
    },
  ],

  //响应拦截器
  responseInterceptors: [
    [
      (response: any) => {
        if (
          response.request.responseType === 'blob' ||
          response.data?.includes?.('data:image')
        ) {
          return response;
        }
		
		// 针对aiproxy接口处理
		if(response.data.success !== undefined) {
			if(response.data.success) {
				return response.data;
			}else {
				message.error(response.data.message)
				return Promise.reject();
			}
		}

		if (response.data.code === 901) {
			if(location.pathname !== '/901') {
				window.location.href = `${location.origin}/901?msg=${response.data.errMsg}`
			}
			return Promise.reject();
		  } else if (response.data.code === 403) {
          message.error('请登录后使用');
          return Promise.reject();
        } else if (response.data.code === 412) {
          localStorage.removeItem('token');
          window.location.href = `${location.origin}/#/login`;
          return Promise.reject();
        } else if (response.data.code === 413) {
			globalModal.bindType = "phone"
			globalModal.bindModalOpen = true
			// 绑定手机号才能使用服务
			return Promise.reject();
		  }else if (response.data.code === 414) {
			globalModal.bindType = "email"
			globalModal.bindModalOpen = true
			// 绑定邮箱才能使用服务
			return Promise.reject();
		  } else if (response.data?.code !== 0) {
          message.error(response.data?.errMsg);
          return Promise.reject(response.data);
        }
        return response.data;
      },
      (error: any) => {
        message.error('服务器错误');
        return Promise.reject(error);
      },
    ],
  ],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<IGlobalInfo> {
  await getGlobalScript();
  let global = {
    setting: await getGlobalSet(),
    userInfo: {},
    menusConfig: await getMenusConfig(),
    protocolConfig: await getProtocolConfig(),
    loginSetting: await getLoginConfig(),
  };

  if(!isLogin() && !global.loginSetting?.hasAuth) {
	window.location.href = `${location.origin}/#/login`;
  }

  return global;
}

export function rootContainer(container: any, args: any) {
  return <ThemeProviderGlobal>{container}</ThemeProviderGlobal>;
}