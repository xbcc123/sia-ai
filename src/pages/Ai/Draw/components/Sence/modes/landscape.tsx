const key = 'landscape'
const sceneType = 'landscape'
export const landscape =  {
	id: 1,
	name: '风景',
	key,
	icon: key,
	sort: 1,
	appList: [
	  {
		drawType: 'textToImg',
		sceneName: '微缩景观',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ec203b95482936937d2f0.jpeg',
		config: {
		  prompt: 'Miniature faking	，Train Lines	，style of Japanese',
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
		sceneName: '建筑',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ec214b95482936937d2f1.jpeg',
		config: {
		  prompt:
			'Structure by Dame Zaha Mohammad Hadid',
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
	],
  }