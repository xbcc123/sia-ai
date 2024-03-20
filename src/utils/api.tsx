import services from '@/services/ai';
import servicesMain from '@/services/main';
import { changeGlobalStyles } from '../valtioStore/index';

// 全局配置
export const getGlobalSet = async () => {
  try {
    const data = await servicesMain.CommonController.getSettingBase({});
    return  data;
  } catch {
    return {};
  }
};

// 用户信息
export const getUserInfo = async () => {
  try {
    const data = await services.LoginController.userInfo({});
	localStorage.setItem('userInfo', JSON.stringify(data));
    return  data;
  } catch {
    return {};
  }
};

// 全局脚本
export const getGlobalScript = async () => {
  try {
    let data = await servicesMain.CommonController.getSettingStyle();
    changeGlobalStyles(data);
    return data;
  } catch (error) {
    return {};
  }
};

// 菜单
export const getMenusConfig = async () => {
	try {
	  const data = await servicesMain.CommonController.getMenusConfig();
	  return  data;
	} catch {
	  return {};
	}
  };
  

//  协议
  export const getProtocolConfig = async () => {
	try {
	  const data = await servicesMain.CommonController.getProtocolConfig();
	  return  data;
	} catch {
	  return {};
	}
  };

//  登录配置
  export const getLoginConfig = async () => {
	try {
	  const data = await servicesMain.CommonController.getSettingLogin();
	  return  data;
	} catch {
	  return {};
	}
  };
