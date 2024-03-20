/*
 * @Author: zhouyashi zhouys@andata.cn
 * @Date: 2023-07-03 15:59:34
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-11-01 20:45:06
 * @FilePath: /andata-moss/config/proxy.ts
 * @Description: 代理配置
 */

// const ApiUrl = 'https://sia.bailan.fun';
const ApiUrl = 'http://124.71.61.5';

const common = {
	onProxyReq: (proxyReq: any, req: any, res: any) => {
        proxyReq.setHeader('x-added', 'foobar');
      },
      selfHandleResponse: true,
      onProxyRes: function onProxyRes(proxyRes: any, req: any, res: any) {
        if (proxyRes.headers['content-encoding']) {
          res.setHeader(
            'content-encoding',
            proxyRes.headers['content-encoding'],
          );
        }
        proxyRes.on('data', function (data: any) {
          res.write(data);
        });
        proxyRes.on('end', function () {
          res.end();
        });
      },
}

export default {
  dev: {
    '/api': {
      target: ApiUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
     ...common
    },
  },
};
