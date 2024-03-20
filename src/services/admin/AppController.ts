
import { request } from '@umijs/max';

// 应用列表
export async function appSearchList(params?: any) {
  return request('/v1/admin/app/searchList', {
    method: 'post',
    data: params,
  });
}

// 应用详情
export async function appInfo(params?: any) {
	return request('/v1/admin/app/info?', {
	  method: 'get',
	  params,
	});
  }

// 删除应用
export async function appRemove(params?: any) {
	return request('/v1/admin/app/remove', {
	  method: 'get',
	  params,
	});
  }

// 创建应用
export async function appCreate(params?: any) {
	return request('/v1/admin/app/create', {
	  method: 'post',
	  data: params,
	});
  }


// 编辑应用
export async function appEdit(params?: any) {
	return request('/v1/admin/app/edit', {
	  method: 'post',
	  data: params,
	});
  }