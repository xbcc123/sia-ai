import { request } from '@umijs/max';

// 公告
export async function notifyDefault(params?: {}) {
  return request('/v1/notify/default', {
    method: 'get',
    params,
  });
}

