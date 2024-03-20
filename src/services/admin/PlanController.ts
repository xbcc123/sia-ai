import { request } from '@umijs/max';

// 列表
export async function searchList(params?: any) {
  return request('/v1/admin/package/searchList', {
    method: 'post',
    data: params,
  });
}

// 详情
export async function info(params?: any) {
  return request('/v1/admin/package/info?', {
    method: 'get',
    params,
  });
}

// 删除
export async function remove(params?: any) {
  return request('/v1/admin/package/remove', {
    method: 'get',
    params,
  });
}

// 编辑
export async function edit(params?: any) {
  return request('/v1/admin/package/edit', {
    method: 'post',
    data: params,
  });
}

// 新建
export async function create(params?: any) {
  return request('/v1/admin/package/create', {
    method: 'post',
    data: params,
  });
}

// 套餐编辑
export async function categoryEdit(params?: any) {
	return request('/v1/admin/package/category/edit', {
	  method: 'post',
	  data: params,
	});
  }
  
  // 套餐列表
export async function categoryList(params?: any) {
	return request('/v1/admin/package/category/list', {
	  method: 'get',
	  params,
	});
  }
  