import { request } from '@umijs/max';

// 发送邮件
export async function sendEmail(params?: {}) {
  return request('/v1/user/email/send', {
    method: 'post',
    data: params,
  });
}

// 邮箱注册
export async function emailRegister(params?: {}) {
  return request('/v1/user/email/signIn', {
    method: 'post',
    data: params,
  });
}

// 图形验证码
export async function captcha(params: any) {
  return request('/v1/user/captcha', {
    method: 'get',
    params,
	// responseType: 'blob',
  });
}

// 密码登录
export async function passwordLogin(params: any) {
  return request('/v1/user/login/password', {
    method: 'post',
    data: params,
  });
}

// 手机邮箱验证码登录
export async function verifyCode(params: any) {
  return request('/v1/user/login/verifyCode', {
    method: 'post',
    data: params,
  });
}

// 用户信息
export async function userInfo(params?: any) {
  return request('/v1/user/info', {
    method: 'get',
    params,
  });
}

// 修改用户信息
export async function editInfo(params: any) {
  return request('/v1/user/info/modify', {
    method: 'post',
    data: params,
  });
}

// 绑定邮箱
export async function bindEmail(params: any) {
	return request('/v1/user/bind/email', {
	  method: 'post',
	  data: params,
	});
  }

// 微信公众号回调接口
export async function loginWechatPublic(params: any) {
	return request('/api/v1/user/login/wechatPublic', {
	  method: 'post',
	  data: params,
	});
  }

// 微信公众号预登录信息
export async function preLoginWechatPublic(params?: any) {
	return request('/v1/user/preLogin/wechatPublic', {
	  method: 'get',
	  params,
	});
  }

// 微信公众号登录TOKEN获取
export async function wechatToken(params: any) {
	return request('/v1/user/login/wechat/token', {
	  method: 'get',
	  params
	});
  }

// 绑定手机号
export async function bindPhone(params: any) {
	return request('/v1/user/bind/phone', {
	  method: 'post',
	  data: params,
	});
  }

// 手机号注册
export async function phoneSignIn(params: any) {
	return request('/v1/user/phone/signIn', {
	  method: 'post',
	  data: params,
	});
  }


// 发送手机验证码
export async function phoneSend(params: any) {
	return request('/v1/user/phone/send', {
	  method: 'post',
	  data: params,
	});
  }

// 找回密码
export async function passwordForget(params: any) {
	return request('/v1/user/password/forget', {
	  method: 'post',
	  data: params,
	});
  }
  
// 微信绑定检测
  export async function bindWechat(params?: any) {
	return request('/v1/user/bind/wechat', {
	  method: 'get',
	  params,
	});
  }