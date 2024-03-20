import { request } from '@umijs/max';

// 基础配置
export async function baseInfo(params?: any) {
	return request('/v1/admin/global/setting/base/info', {
	  method: 'get',
	  params,
	});
  }

// 基础配置-编辑
  export async function baseEdit(params?: any) {
	return request('/v1/admin/global/setting/base/edit', {
	  method: 'post',
	  data: params,
	});
  }

// 登录授权
export async function authLoginInfo(params?: any) {
	return request('/v1/admin/global/setting/authLogin/info', {
	  method: 'get',
	  params,
	});
  }

// 登录授权-编辑
export async function authLoginEdit(params?: any) {
	return request('/v1/admin/global/setting/authLogin/edit', {
	  method: 'post',
	  data: params,
	});
  }

// 邮件以及短信
export async function emailInfo(params?: any) {
	return request('/v1/admin/global/setting/email/info', {
	  method: 'get',
	  params,
	});
  }

// 邮件以及短信-编辑
export async function emailEdit(params?: any) {
	return request('/v1/admin/global/setting/email/edit', {
	  method: 'post',
	  data: params,
	});
  }

// 产品支付
export async function payInfo(params?: any) {
	return request('/v1/admin/global/setting/pay/info', {
	  method: 'get',
	  params,
	});
  }


// 产品支付-编辑
export async function payEdit(params?: any) {
	return request('/v1/admin/global/setting/pay/edit', {
	  method: 'post',
	  data: params,
	});
  }


// 新人与邀请
export async function inviteInfo(params?: any) {
	return request('/v1/admin/global/setting/invite/info', {
	  method: 'get',
	  params,
	});
  }


// 新人与邀请编辑
export async function inviteEdit(params?: any) {
	return request('/v1/admin/global/setting/invite/edit', {
	  method: 'post',
	  data: params,
	});
  }


// 提示信息
export async function promptInfo(params?: any) {
	return request('/v1/admin/global/setting/prompt/info', {
	  method: 'get',
	  params,
	});
  }


// 提示信息-编辑
export async function promptEdit(params?: any) {
	return request('/v1/admin/global/setting/prompt/edit', {
	  method: 'post',
	  data: params,
	});
  }


// 公告通知
export async function notifylInfo(params?: any) {
	return request('/v1/admin/global/setting/notify/info', {
	  method: 'get',
	  params,
	});
  }


// 公告通知-编辑
export async function notifyEdit(params?: any) {
	return request('/v1/admin/global/setting/notify/edit', {
	  method: 'post',
	  data: params,
	});
  }


// 脚本样式
export async function styleInfo(params?: any) {
	return request('/v1/admin/global/setting/style/info', {
	  method: 'get',
	  params,
	});
  }


// 脚本样式-编辑
export async function styleEdit(params?: any) {
	return request('/v1/admin/global/setting/style/edit', {
	  method: 'post',
	  data: params,
	});
  }

//  AI工具
export async function toolInfo(params?: any) {
	return request('/v1/admin/global/setting/tool/info', {
	  method: 'get',
	  params,
	});
  }

// AI工具-编辑
export async function toolEdit(params?: any) {
	return request('/v1/admin/global/setting/tool/edit', {
	  method: 'post',
	  data: params,
	});
  }