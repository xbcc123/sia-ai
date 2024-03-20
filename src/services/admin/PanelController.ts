import { request } from '@umijs/max';

// home信息
export async function homeInfo(params?: any) {
  return request('/v1/admin/home/info', {
    method: 'get',
    params,
  });
}
