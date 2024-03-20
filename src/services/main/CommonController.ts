import { request } from '@umijs/max';

type IuploadType = 'logo' | 'images' | 'file';
// 上传
export async function upload(type: IuploadType, data: any) {
  return request(`/v1/admin/file/upload/${type || 'images'}`, {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
}

// 基础配置
export async function getSettingBase(data?: {}) {
  return request(`/v1/config/SETTING_BASE`, {
    method: 'get',
    params: data,
  });
}

// 站点脚本样式
export async function getSettingStyle(data?: {}) {
  return request(`/v1/config/SETTING_STYLE`, {
    method: 'get',
    params: data,
  });
}

// 产品支付配置
export async function getSettingPay(data?: {}) {
  return request(`/v1/config/SETTING_PAY`, {
    method: 'get',
    params: data,
  });
}

// 菜单
export const getMenusConfig = () => {
  return request(`/v1/config/MENU_USER`, {
    method: 'get',
  });
};

// 隐私配置
export const getProtocolConfig = () => {
  return request(`/v1/config/PROTOCOL_PRIACY`, {
    method: 'get',
  });
};

// 登录
export const getSettingLogin = () => {
  return request(`/v1/config/SETTING_LOGIN`, {
    method: 'get',
  });
};
