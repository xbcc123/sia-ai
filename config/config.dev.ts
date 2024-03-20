/*
 * @Author: yankj yankj
 * @Date: 2023-07-05 17:21:50
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-08-14 21:45:38
 * @FilePath: /andata-moss/config/config.dev.ts
 * @Description: 开发环境配置
 */

import { defineConfig } from "@umijs/max";

export default defineConfig({
  define: {
    'process.env': {
	  BASE_URL: '/api',
      UMI_ENV: 'dev',
    },
  },
});
