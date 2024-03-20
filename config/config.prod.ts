/*
 * @Author: yankj yankj
 * @Date: 2023-07-06 14:24:23
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-11-29 14:25:03
 * @FilePath: /andata-moss/config/config.prod.ts
 * @Description: 生产环境配置
 */

import { defineConfig } from "@umijs/max";

export default defineConfig({
  define: {
    'process.env': {
	  BASE_URL: 'http://124.71.61.5/api',
	  UMI_ENV: 'prod',
    },
  },
});
