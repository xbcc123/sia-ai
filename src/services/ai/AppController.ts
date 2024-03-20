import { request } from '@umijs/max';

// 应用列表
export async function appList(params?: {}) {
  return request('/v1/app/list', {
    method: 'get',
    params,
  });
}

// 应用详情
export async function appInfo(params?: {id: number}) {
	return request(`/v1/app/info?id=${params?.id}`, {
	  method: 'get',
	  params,
	});
  }
  
  