const key = 'game'
const sceneType = 'game'
export const entity =  {
	id: 1,
	name: '实物',
	key,
	icon: key,
	sort: 1,
	appList: [
	  {
		drawType: 'textToImg',
		sceneName: '玩具',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ebf37b95482936937d2ef.jpeg',
		config: {
		  prompt: 'product photography， Stormtrooper, plastic, toy	，white background, studio lighting	hand painted',
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
		sceneName: '食物',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ebec2b95482936937d2ee.jpeg',
		config: {
		  prompt:
			'food photography，steak, medium rare, steaming, light garnishes, sitting on plate，epic lighting	，depth of field',
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