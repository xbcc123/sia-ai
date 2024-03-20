import { request } from '@umijs/max';

// 画廊列表
export async function gallerySearchList(data?: {}) {
  return request('/v1/image/gallery/searchList', {
    method: 'post',
    data,
  });
}

