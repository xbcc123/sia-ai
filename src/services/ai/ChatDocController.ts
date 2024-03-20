import { request } from '@umijs/max';

const requestPropsFn = (headers?: any): any => {
	return {
		headers: {
			["Api-Key"]: JSON.parse(localStorage.getItem('userInfo') || "{}")?.apiKey,
			...headers
		}
	}
}

// 创建一个垂直聊天机器人、知识库
export async function libraryCreate(params?: any) {
  return request('/aiproxy/api/library/create', {
    method: 'post',
    data: params,
	...requestPropsFn()
  });
}

// 添加一个URL链接到知识库
export async function documentCreateByUrl(params?: any) {
  return request(
    `/aiproxy/api/library/document/createByUrl`,
    {
      method: 'post',
      data: params,
	  ...requestPropsFn()
    },
  );
}

// 直接提交一个文本文档到知识库
export async function documentCreateByText(params?: any) {
  return request(
    `/aiproxy/api/library/document/createByText`,
    {
      method: 'post',
      data: params,
	  ...requestPropsFn()
    },
  );
}

// 上传文件
export async function documentCreateByTextUpload(params?: any) {
	return request(
	  `/aiproxy/api/library/document/upload`,
	  {
		method: 'post',
		data: params,
		...requestPropsFn({
			'Content-Type': 'multipart/form-data',
		})
	  },
	);
  }


// 查看知识库已有的文档
export async function libraryListDocument(params?: any) {
  return request(`/aiproxy/api/library/listDocument`, {
    method: 'get',
    params,
	...requestPropsFn()
  });
}

// 查看我创建的知识库
export async function libraryList(params?: any){
  return request(`/aiproxy/api/library/list`, {
    method: 'get',
    params,
	...requestPropsFn()
  });
}

// 删除知识库
export async function libraryDelete(params?: any){
	return request(`/aiproxy/api/library/delete`, {
	  method: 'get',
	  params,
	  ...requestPropsFn()
	});
  }

// 删除知识库的某个文档
export async function documentDelete(params?: any) {
  return request(`/aiproxy/api/library/document/delete`, {
    method: 'post',
    data: params,
	...requestPropsFn()
  });
}

// 使用已经定制好的知识库进行对话问答
export async function libraryAsk(params?: any) {
  return request(`/aiproxy/api/library/ask`, {
    method: 'post',
    data: params,
	...requestPropsFn()
  });
}

// 创建appKey
export async function createApiKey(params?: any) {
  return request(`/v1/ap/user/createApiKey`, {
    method: 'post',
    data: params,
	...requestPropsFn()
  });
}
