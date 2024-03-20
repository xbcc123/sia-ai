import { request } from '@umijs/max';


// 用户菜单
export async function userInfo(params?: any) {
	return request('/v1/admin/global/menu/user/info', {
	  method: 'get',
	  params,
	});
  }

// 用户菜单-编辑
export async function userEdit(params?: any) {
	return request('/v1/admin/global/menu/user/edit', {
		method: 'post',
		data: params,
	});
  }

