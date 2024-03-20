import { request } from '@umijs/max';

// MJ模型列表
export async function MJ_BASE_PROMPT(data?: {}) {
  return request(`/v1/config/MJ_BASE_PROMPT`, {
	method: 'get',
    params: data,
  });
}