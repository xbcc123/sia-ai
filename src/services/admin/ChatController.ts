import { request } from '@umijs/max';

//消息列表
export async function messageSearchList(params?: any) {
  return request('v1/admin/session/message/searchList', {
    method: 'post',
    data: params,
  });
}

//删除消息
export async function messageRemove(params?: any) {
  return request('/v1/admin/session/message/remove', {
    method: 'get',
    params,
  });
}

// 编辑消息
export async function messageEdit(params?: any) {
  return request('/api/v1/admin/session/message/edit', {
    method: 'post',
    data: params,
  });
}

// 会话列表
export async function sessionSearchList(params?: any) {
  return request('/v1/admin/session/searchList', {
    method: 'post',
    data: params,
  });
}

// 删除会话
export async function sessionRemove(params?: any) {
  return request('/v1/admin/session/remove', {
    method: 'get',
    params,
  });
}

// 编辑会话
export async function sessionEdit(params?: any) {
  return request('/api/v1/admin/session/edit', {
    method: 'post',
    data: params,
  });
}

// 对话池列表
export async function accountSearchList(params?: any) {
  return request('/v1/admin/session/account/searchList', {
    method: 'post',
    data: params,
  });
}

// 对话池账号详情
export async function accountInfo(params?: any) {
  return request('/v1/admin/session/account/info', {
    method: 'get',
    params,
  });
}

// 创建对话池
export async function accountCreate(params?: any) {
  return request('/v1/admin/session/account/create', {
    method: 'post',
    data: params,
  });
}

// 编辑对话池
export async function accountEdit(params?: any) {
  return request('/v1/admin/session/account/edit', {
    method: 'post',
    data: params,
  });
}

// 删除对话池
export async function accountRemove(params?: any) {
  return request('/v1/admin/session/account/remove', {
    method: 'get',
    params,
  });
}

// 对话平台列表
export async function platformList(params?: any) {
  return request('/v1/admin/session/platform/list', {
    method: 'get',
    params,
  });
}

// 模型集合
export async function modelList(params?: any) {
  return request('/v1/admin/session/model/list', {
    method: 'get',
    params,
  });
}

// 测试账号可用性
export async function accountTest(params?: any) {
  return request('/v1/admin/session/account/test', {
    method: 'get',
    params,
  });
}

// 变更可用
export async function accountUpdateValid(params?: any) {
  return request('/v1/admin/session/account/updateValid', {
    method: 'get',
    params
  });
}
