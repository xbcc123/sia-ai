import { request } from '@umijs/max';

// 提交绘画
export async function taskSubmit(data?: {}) {
  return request('/v1/image/task/submit', {
    method: 'post',
    data,
  });
}

// 任务列表
export async function taskSearchList(data?: {}) {
  return request(`/v1/image/task/searchList`, {
    method: 'post',
    data,
  });
}

// 切换公开私有
export async function publicChange(data?: {}) {
  return request(`/v1/image/public/change`, {
    method: 'post',
    data,
  });
}

// 删除任务
export async function taskDelete(data?: {}) {
  return request(`/v1/image/task/delete`, {
    method: 'get',
    params: data,
  });
}

// 获取任务进度
export async function taskStatus(data?: {id: string}) {
	return request(`/v1/image/task/${data?.id}`, {
	  method: 'get',
	});
  }
