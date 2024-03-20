const ApiUrl = '';

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
