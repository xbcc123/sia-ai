import { fetchEventSource } from '@/sse';
import { saltAndHash } from '@/utils';
import { request } from '@umijs/max';

const { BASE_URL } = process.env;

// 会话列表
export async function sessionList(params?: any) {
  return request('/v1/chat/session/list', {
    method: 'get',
    params,
  });
}

// 新建对话
export async function sessionCreate(data?: any) {
  return request('/v1/chat/session/create', {
    method: 'post',
    data,
  });
}

// 删除对话
export async function sessionDelete(data?: any) {
  return request('/v1/chat/session/delete', {
    method: 'get',
    params: data,
  });
}

// 置顶对话
export async function sessionPinned(data?: any) {
  return request('/v1/chat/session/pinned', {
    method: 'get',
    params: data,
  });
}

// 对话记录
export async function messageList(data?: any) {
  return request('/v1/chat/messageList', {
    method: 'post',
    data,
  });
}

// 对话记录(固定条数)
export async function messageTopList(params?: any) {
  return request('/v1/chat/message/topList', {
    method: 'get',
    params,
  });
}

// 删除对话记录
export async function messageDelete(data?: any) {
  return request('/v1/chat/delete', {
    method: 'get',
    params: data,
  });
}

//  清空对话记录
export async function sessionClear(data?: any) {
  return request('/v1/chat/session/clear', {
    method: 'get',
    params: data,
  });
}

// 编辑对话
export async function sessionUpdate(data?: any) {
  return request('/v1/chat/session/update', {
    method: 'post',
    data,
  });
}

// 对话 - 流式对话
export async function completions(
  data: any,
  {
    cb,
    ctrlCb,
    end,
  }: {
    cb: (val: string) => void;
    ctrlCb: (ctrl: any) => void;
    end: () => void;
  },
) {
  const ctrl = new AbortController();
  ctrlCb(ctrl);
  await fetchEventSource(`${BASE_URL}/v1/chat/completions`, {
    signal: ctrl.signal,
    fetch: window.fetch,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token') || '',
      'x-dm': saltAndHash(location.origin, 'SiaAi@20!2*3#'),
    },
    body: JSON.stringify(data),
    async onopen(response) {
      //   console.log(response, response.headers.get('content-type'));
    },
    async onclose() {},
    onmessage(ev) {
      // console.log(String(ev.data));
      let result = ev.data;
      if (result.includes('[DONE]')) {
        cb(result.replace('[DONE]', ''));
        end();
        ctrl.abort();
        return;
      }
      cb(result);
    },
    onerror(err) {
      console.error(err);
      // 必须抛出错误才会停止
      throw err;
    },
  });
}

// 知识库 - 流式对话
export async function completionsChatDoc(
  data: any,
  {
    cb,
    ctrlCb,
    end,
  }: {
    cb: (val: MessageResultChatDoc) => void;
    ctrlCb: (ctrl: any) => void;
    end: () => void;
  },
) {
  const ctrl = new AbortController();
  ctrlCb(ctrl);
  await fetchEventSource(`${BASE_URL}/v1/chat/aiproxy`, {
    signal: ctrl.signal,
    fetch: window.fetch,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem('token') || '',
      'x-dm': saltAndHash(location.origin, 'SiaAi@20!2*3#'),
    },
    body: JSON.stringify(data),
    async onopen(response) {
    },
    async onclose() {
      console.log('close');
    },
    onmessage(ev) {
      let result = JSON?.parse(ev?.data || '{}')
      if (result.finish) {
		cb(result);
        end();
        ctrl.abort();
        return;
      }
    //   console.log(result);
      cb(result);
    },
    onerror(err) {
      console.error(err);
      // 必须抛出错误才会停止
      throw err;
    },
  });
}
