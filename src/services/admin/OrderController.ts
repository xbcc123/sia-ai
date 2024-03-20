import { request } from '@umijs/max';

// 列表
export async function searchList(params?: any) {
  return request('/v1/admin/order/searchList', {
    method: 'post',
    data: params,
  });
}

// 删除
export async function remove(params?: any) {
  return request('/v1/admin/order/remove', {
    method: 'get',
    params,
  });
}
