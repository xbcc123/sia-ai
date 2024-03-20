import { request } from '@umijs/max';

// 列表
export async function searchList(params?: any) {
  return request('/v1/admin/user/searchList', {
    method: 'post',
    data: params,
  });
}

// 详情
export async function info(params?: any) {
  return request('/v1/admin/user/info?', {
    method: 'get',
    params,
  });
}

// 删除
// export async function remove(params?: any) {
//   return request('/v1/admin/user/remove', {
//     method: 'get',
//     params,
//   });
// }

// 编辑
export async function edit(params?: any) {
  return request('/v1/admin/user/edit', {
    method: 'post',
    data: params,
  });
}

// 重置密码
export async function passwordReset(params?: any) {
  return request('/v1/admin/user/password/reset', {
    method: 'post',
    data: params,
  });
}

// 列表
export async function userPackageSearchList(params?: any) {
  return request('/v1/admin/user/package/searchList', {
    method: 'post',
    data: params,
  });
}

// 删除
export async function userPackageRemove(params?: any) {
  return request('/v1/admin/user/remove', {
    method: 'get',
    params,
  });
}
