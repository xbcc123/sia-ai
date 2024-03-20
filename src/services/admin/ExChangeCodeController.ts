import { request } from '@umijs/max';


// 兑换码列表
export async function exchangeCodeList(params?: any) {
  return request('/v1/admin/exchange/list', {
    method: 'post',
    data: params,
  });
}

//  批量生成兑换码
export async function exchangeCodeBatch(params?: any) {
  return request('/v1/admin/exchange/generate/batch', {
    method: 'post',
    data: params,
  });
}

//  删除兑换码
export async function exchangeCodeDelete(params?: any) {
  return request('/v1/admin/exchange/remove', {
    method: 'get',
    params,
  });
}
