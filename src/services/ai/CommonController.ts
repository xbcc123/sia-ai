import { request } from '@umijs/max';

// GPT模型列表
export async function configGpt(data?: {}) {
  return request('/v1/chat/model/list', {
    method: 'get',
    params: data,
  });
}

// MJ模型列表
export async function configMj(data?: {}) {
  return request(`/v1/image/model/list`, {
    method: 'get',
    params: data,
  });
}

// 图片反代
export async function imageProxy(data?: {}) {
  return request(`/v1/image/proxy`, {
    method: 'get',
    params: data,
  });
}

// 余额检查
export async function chatQuotaCheck(data?: {}) {
	return request(`/v1/chat/quota/check`, {
	  method: 'get',
	  params: data,
	});
  }
