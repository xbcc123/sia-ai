import { defineConfig } from "@umijs/max";

export default defineConfig({
  define: {
    'process.env': {
	  BASE_URL: '/api',
      UMI_ENV: 'dev',
    },
  },
});
