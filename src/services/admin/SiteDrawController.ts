import { request } from '@umijs/max';


// 通用配置
export async function commonInfo(params?: any) {
	return request('/v1/admin/global/image/common/info', {
	  method: 'get',
	  params,
	});
  }

// 通用配置-编辑
export async function commonEdit(params?: any) {
	return request('/v1/admin/global/image/common/edit', {
		method: 'post',
		data: params,
	});
  }

// 图片展示方式
export async function showInfo(params?: any) {
	return request('/v1/admin/global/image/show/info', {
	  method: 'get',
	  params,
	});
  }

// 图片展示方式-编辑
export async function showEdit(params?: any) {
	return request('/v1/admin/global/image/show/edit', {
		method: 'post',
		data: params,
	});
  }

// 代理设置
export async function proxyInfo(params?: any) {
	return request('/v1/admin/global/image/proxy/info', {
	  method: 'get',
	  params,
	});
  }

// 代理设置-编辑
export async function proxyEdit(params?: any) {
	return request('/v1/admin/global/image/proxy/edit', {
		method: 'post',
		data: params,
	});
  }

// 模型消耗
export async function consumeInfo(params?: any) {
	return request('/v1/admin/global/image/consume/info', {
	  method: 'get',
	  params,
	});
  }

// 模型消耗-编辑
export async function consumeEdit(params?: any) {
	return request('/v1/admin/global/image/consume/edit', {
		method: 'post',
		data: params,
	});
  }






