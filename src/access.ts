import {IGlobalInfo} from './types/index';

export default (initialState: IGlobalInfo) => {
	const { menusConfig } = initialState
	
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
	
  const { appOpen,
	chatOpen,
	galleryOpen,
	imageOpen,
	meOpen,
	senceOpen } = menusConfig

  return {
    canSeeAdmin: true,
	appOpen,
	chatOpen,
	galleryOpen,
	imageOpen,
	meOpen,
	senceOpen,
  };
};
