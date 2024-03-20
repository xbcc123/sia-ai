import { request } from '@umijs/max';

// 绘画列表
export async function searchList(params?: any) {
  return request('/v1/admin/image/searchList', {
    method: 'post',
    data: params,
  });
}

// 删除记录
export async function imageDelete(params?: any) {
	return request('/v1/admin/image/delete', {
	  method: 'get',
	  params,
	});
  }

// 账号池列表
export async function accountSearchList(params?: any) {
	return request('/v1/admin/image/account/searchList', {
	  method: 'post',
	  data: params,
	});
  }
  

// 创建绘画账号
export async function accountCreate(params?: any) {
	return request('/v1/admin/image/account/create', {
	  method: 'post',
	  data: params,
	});
  }

// 编辑绘画账号
export async function accountEdit(params?: any) {
	return request('/v1/admin/image/account/edit', {
	  method: 'post',
	  data: params,
	});
  }
  
//   绘画账号详情
export async function accountInfo(params?: any) {
	return request('/v1/admin/image/account/info', {
	  method: 'get',
	  params,
	});
  }


// 删除绘画账号
export async function accountDelete(params?: any) {
	return request('/v1/admin/image/account/delete', {
	  method: 'get',
	  params,
	});
  }


// 服务启动/停止/重启 服务操作：start-启动 stop-停止 restart-重启
export async function accountControl(params?: any) {
	return request('/v1/admin/image/account/control', {
	  method: 'get',
	  params,
	});
  }