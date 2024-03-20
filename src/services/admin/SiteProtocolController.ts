import { request } from '@umijs/max';


// 用户隐私协议
export async function commonInfo(params?: any) {
	return request('/v1/admin/global/protocol/privacy/info', {
	  method: 'get',
	  params,
	});
  }

// 用户隐私协议-编辑
export async function commonEdit(params?: any) {
	return request('/v1/admin/global/protocol/privacy/edit', {
		method: 'post',
		data: params,
	});
  }
