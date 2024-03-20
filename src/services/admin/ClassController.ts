import { request } from '@umijs/max';

// 分类列表
export async function searchList(params?: any) {
  return request('/v1/admin/category/list', {
    method: 'get',
    params
  });
}

// 应用详情
export async function info(params?: any) {
	return request('/v1/admin/category/info?', {
	  method: 'get',
	  params,
	});
  }

// 删除应用
export async function remove(params?: any) {
	return request('/v1/admin/category/remove', {
	  method: 'get',
	  params,
	});
  }

// 创建应用
export async function create(params?: any) {
	return request('/v1/admin/category/create', {
	  method: 'post',
	  data: params,
	});
  }


// 编辑应用
export async function edit(params?: any) {
	return request('/v1/admin/category/edit', {
	  method: 'post',
	  data: params,
	});
  }