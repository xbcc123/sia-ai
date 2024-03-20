import { request } from '@umijs/max';

// 获取模型配置
export async function modelList(params?: any) {
	return request('/v1/admin/global/chat/model/list', {
	  method: 'get',
	  params,
	});
  }

// 创建模型配置
export async function modelCreate(params?: any) {
	return request('/v1/admin/global/chat/model/create', {
	  method: 'post',
	  data: params,
	});
  }

// 编辑模型配置
export async function defaultModelEdit(params?: any) {
	return request('/v1/admin/global/chat/model/default/edit', {
	  method: 'post',
	  data: params,
	});
  }

  // 编辑自定义模型配置
export async function modelEdit(params?: any) {
	return request('/v1/admin/global/chat/model/edit', {
	  method: 'post',
	  data: params,
	});
  }


// 基础设置信息
export async function baseInfo(params?: any) {
	return request('/v1/admin/global/chat/base/info', {
	  method: 'get',
	  params,
	});
  }

// 基础设置编辑
export async function baseEdit(params?: any) {
	return request('/v1/admin/global/chat/base/edit', {
	  method: 'post',
	  data: params,
	});
  }

// 删除自定义模型
export async function modelRemove(params?: any) {
	return request('/v1/admin/global/chat/model/remove', {
	  method: 'get',
	  params,
	});
  }

// 默认预设配置
export async function presetInfo(params?: any) {
	return request('/v1/admin/global/chat/preset/info', {
	  method: 'get',
	  params,
	});
  }

// 编辑预设配置
export async function presetEdit(params?: any) {
	return request('/v1/admin/global/chat/preset/edit', {
		method: 'post',
		data: params,
	});
  }
