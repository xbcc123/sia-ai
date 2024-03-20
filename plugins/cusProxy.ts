import { IApi } from '@umijs/max';

export default (api: IApi) => {
  api.describe({
    key: 'cusProxy',
    // config: {
    //   schema(joi) {
    //     return joi.string();
    //   },
    // },
    // enableBy: api.EnableBy.config
  });
  api.chainWebpack((memo, { webpack, env }) => {
    memo.devServer
      .port(8888)
      .open(true)
      .proxy({
        '/api': {
        },
      });

    // memo.devServer.proxy({
    // 	'/api': {
    // 		target: 'https://sia.bailan.fun',
    // 			changeOrigin: true,
    // 			pathRewrite: { '^/api': '/api' },
    // 	  }
    // })
    // memo.devServer.proxy = (value: any): any => {
    // console.log(value);
    // 	return {
    // 		'/api': {
    // 			target: 'https://sia.bailan.fun',
    // 			changeOrigin: true,
    // 			pathRewrite: { '^/api': '/api' },
    // 		},
    // 	}
    // };
    // // set alias
    // memo.resolve.alias.set('a','path/to/a');
    // // Delete progess bar plugin
    // memo.plugins.delete('progess');
  });
};
