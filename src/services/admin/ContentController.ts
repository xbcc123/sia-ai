
import { request } from '@umijs/max';

// 套餐列表
export async function packageList(params?: any) {
  return request('/v1/package/list', {
    method: 'get',
    params,
  });
}

// 支付宝预下单
export async function alipayQrcode(params?: any) {
  return request('/v1/pay/alipay/qrcode', {
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
  return request('/v1/exchangeCode/trade', {
    method: 'get',
    params,
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
