import { request } from '@umijs/max';

// 套餐列表
export async function packageList(params?: any) {
  return request('/v1/package/list', {
    method: 'get',
    params,
  });
}

// 我的套餐
export async function userMyList(data?: any) {
  return request('/v1/package/user/myList', {
    method: 'post',
    data,
  });
}

// 支付宝预下单
export async function alipayQrcode(params?: any) {
  return request('/v1/pay/alipay/qrcode', {
    method: 'get',
    params,
  });
}

// 获取订单状态
export async function orderState(params?: any) {
	return request('/v1/pay/order/state', {
	  method: 'get',
	  params,
	});
  }

  
// 兑换码列表
export async function exchangeCodeList(params?: any) {
  return request('/v1/exchangeCode/list', {
    method: 'get',
    params,
  });
}

//   兑换
export async function exchangeCode(params?: any) {
  return request(`/v1/exchangeCode/trade?code=${params.code}`, {
    method: 'get',
    data: params,
  });
}

//  批量生成兑换码
export async function exchangeCodeBatch(params?: any) {
  return request('/v1/exchangeCode/generate/batch', {
    method: 'post',
    data: params,
  });
}

//  删除兑换码
export async function exchangeCodeDelete(params?: any) {
  return request('/v1/exchangeCode/remove', {
    method: 'get',
    params,
  });
}

// 我的邀请码
export async function inviteInfo(params?: any) {
  return request('/v1/invite/info', {
    method: 'get',
    params,
  });
}

// 邀请列表
export async function inviteList(data?: any) {
  return request('/v1/invite/list', {
    method: 'post',
    data,
  });
}

// 微信支付
export async function wechatQrcode(params?: any) {
	return request('/v1/pay/wechat/qrcode', {
	  method: 'get',
	  params,
	});
  }