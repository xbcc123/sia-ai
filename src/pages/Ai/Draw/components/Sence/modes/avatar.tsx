const key = 'avatar'
const sceneType = 'avatar'
export const avatar =  {
	id: 1,
	name: '头像',
	key,
	icon: key,
	sort: 1,
	appList: [
		{
			drawType: 'textToImg',
			sceneName: '3D 卡通头像',
			sceneType,
			url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ecc41b95482936937d2ff.jpeg',
			config: {
			  prompt: 'flat vector graphic line logo of cat, simple minimal',
			  model: 'mj',
			  cus: false,
			  ar: '1:1',
			  chaos: 0,
			  s: 0,
			  q: 0.25,
			  tile: false,
			  v: 5.2,
			  images: [],
			  isPublic: false,
			},
		  },
	  {
		drawType: 'textToImg',
		sceneName: '动漫风头像',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ecc7eb95482936937d300.jpeg',
		config: {
		  prompt: 'flat vector graphic line logo of cat, simple minimal',
		  model: 'mj',
		  cus: false,
		  ar: '1:1',
		  chaos: 0,
		  s: 0,
		  q: 0.25,
		  tile: false,
		  v: 5.2,
		  images: [],
		  isPublic: false,
		},
	  },
	  {
		drawType: 'textToImg',
		sceneName: '赛博朋克头像',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ecc9cb95482936937d301.jpeg',
		config: {
		  prompt:
			'letter A logo, lettermark, typography, vector simple minimal',
		  model: 'mj',
		  cus: false,
		  ar: '1:1',
		  chaos: 0,
		  s: 0,
		  q: 0.25,
		  tile: false,
		  v: 5.2,
		  images: [],
		  isPublic: false,
		},
	  },
	//   {
	// 	drawType: 'mixedImage',
	// 	sceneName: '融合头像',
	// 	sceneType,
	// 	url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/1697172933901819904.png',
	// 	config: {
	// 	  images: [],
	// 	},
	//   },
	
	],
  }