import { request } from '@umijs/max';


// 基础设置
export async function commonInfo(params?: any) {
	return request('/v1/admin/global/safe/base/info', {
	  method: 'get',
	  params,
	});
  }

// 基础设置-编辑
export async function commonEdit(params?: any) {
	return request('/v1/admin/global/safe/base/edit', {
		method: 'post',
		data: params,
	});
  }

// 第三方平台
export async function thirdInfo(params?: any) {
	return request('/v1/admin/global/safe/third/info', {
	  method: 'get',
	  params,
	});
  }

// 第三方平台-编辑
export async function thirdEdit(params?: any) {
	return request('/v1/admin/global/safe/third/edit', {
		method: 'post',
		data: params,
	});
  }

// 创建敏感词
export async function sensitiveWordCreate(params?: any) {
	return request('/v1/admin/content/safe/sensitiveWord/create', {
	  method: 'post',
	  data: params,
	});
  }

// 编辑敏感词
export async function sensitiveWordEdit(params?: any) {
	return request('/v1/admin/content/safe/sensitiveWord/edit', {
	  method: 'post',
	  data: params,
	});
  }

  // 敏感词详情
  export async function safeSensitiveWord(params?: any) {
	return request('/v1/admin/content/safe/sensitiveWord', {
	  method: 'get',
	  params,
	});
  }

// 删除敏感词
export async function sensitiveWordRemove(params?: any) {
	return request('/v1/admin/content/safe/sensitiveWord/remove', {
	  method: 'get',
	  params,
	});
  }

// 敏感词列表
export async function sensitiveWordSearchList(params?: any) {
	return request('/v1/admin/content/safe/sensitiveWord/searchList', {
	  method: 'post',
	  data: params,
	});
  }