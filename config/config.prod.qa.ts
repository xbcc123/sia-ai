import { defineConfig } from "@umijs/max";


export default defineConfig({
  define: {
    'process.env': {
	  BASE_URL: '',
	  UMI_ENV: 'qa',
    },
  },
});
