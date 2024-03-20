import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
import zhCN from 'antd/locale/zh_CN';

export default defineConfig({
  plugins: [
	// require.resolve('../plugins/html.ts'), 
  	require.resolve("umi-plugin-antd-style")
],
 outputPath: "sia-ai",
  antd: {
    // configProvider
    configProvider: {
		locale: zhCN,
    },
    // less or css, default less
    style: 'less',
    // shortcut of `configProvider.theme`
    // use to configure theme token, antd v5 only
    theme: {
      token: {
      },
    },
    // antd <App /> valid for version 5.1.0 or higher, default: undefined
    appConfig: {},
    // Transform DayJS to MomentJS
    // Add StyleProvider for legacy browsers
    styleProvider: {
      hashPriority: 'high',
      legacyTransformer: true,
    },
  },
  antdStyle: {
    // 在这里配置所有的默认值，会被运行时配置修改
  },
  valtio: {},
  metas: [
	{ name: 'keywords', content: 'AI助手,人工智能,AI绘画,工作效率,企业赋能' },
	{ name: 'description', content: '一款全新的AIGC产品' },
  ],
  esbuildMinifyIIFE: true,
  history: { type: 'browser' },
  //   theme: {
  //     '@primary-color': '#7848f1',
  //   },
  hash: true,
  access: {},
  initialState: {},
  model: {},
  request: {},
  routes: routes,
  proxy: proxy['dev'],
  npmClient: 'pnpm',
});
