/*
 * @Author: yankj yankj
 * @Date: 2023-07-06 14:24:15
 * @LastEditors: yankj yankj
 * @LastEditTime: 2023-08-12 18:42:31
 * @FilePath: /andata-moss/config/config.test.ts
 * @Description: 测试环境配置
 */

import { defineConfig } from "@umijs/max";


export default defineConfig({
  define: {
    'process.env': {
	  BASE_URL: '',
	  UMI_ENV: 'qa',
    },
  },
});
