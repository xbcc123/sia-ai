import { request } from '@umijs/max';

// 应用商店
export async function toolSearchList(params?: any) {
  return request('/v1/tool/searchList', {
    method: 'get',
    params,
  });
}

// 应用列表
export async function toolAppList(params?: any) {
  return request(`/v1/tool/appList`, {
    method: 'get',
    params,
  });
}

// 添加应用
export async function toolAdd(params?: any) {
  return request(`/v1/tool/add`, {
    method: 'get',
    params,
  });
}

// 删除应用
export async function toolDelete(params?: any) {
  return request(`/v1/tool/delete?id=${params?.id}`, {
    method: 'get',
    // params,
  });
}

// 一键抠图
export async function generalSegment(params?: any) {
	return request(`/v1/tool/image/general/segment`, {
	  method: 'post',
	  data: params,
	});
  }

// 老照片修复
export async function convertPhoto(params?: any) {
	return request(`/v1/tool/image/convert/photo`, {
	  method: 'post',
	  data: params,
	});
  }


// 图片配文
export async function poemMaterial(params?: any) {
	return request(`/v1/tool/image/poem/material`, {
	  method: 'post',
	  data: params,
	});
  }


// 图片风格转换
export async function styleConversion(params?: any) {
	return request(`/v1/tool/image/style/conversion`, {
	  method: 'post',
	  data: params,
	});
  }
