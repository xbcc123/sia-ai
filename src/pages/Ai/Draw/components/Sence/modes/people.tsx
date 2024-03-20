const key = 'avatar'
const sceneType = 'avatar'
export const people =  {
	id: 1,
	name: '人物',
	key,
	icon: key,
	sort: 1,
	appList: [
	  {
		drawType: 'textToImg',
		sceneName: '名人照片',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ec9f9b95482936937d2fd.jpeg',
		config: {
		  prompt: 'Keanu Reeves',
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
		sceneName: '老照片',
		sceneType,
		url: 'https://sia-font.oss-cn-beijing.aliyuncs.com/images/650ec7b5b95482936937d2fb.jpeg',
		config: {
		  prompt: 'photography，a group of Chinese people gathered around Darth Vader， on the street，fuji film style of 1990s',
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