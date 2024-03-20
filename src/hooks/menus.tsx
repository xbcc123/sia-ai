import { isLogin } from '@/utils';
import { useAccess, useLocation, useModel } from '@umijs/max';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

export const useMenus = () => {
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const { menusConfig } = initialState;

  useEffect(() => {
    if (!isLogin()) {
      setMenus(menus.filter((item) => item.url !== '/ai/me'));
    }
    if (menusConfig?.customList?.length > 0) {
      let customList = menusConfig?.customList?.sort((a: any, b: any) => a.sort - b.sort)
	  customList = customList?.map?.((item: any) => {
          return {
            ...item,
            access: item?.open,
            checked: false,
			key: item.value
          };
        }) || [];
      let meIndex = menus.findIndex((item) => item.url === '/ai/me');
      let newMenus: any[] = [];
      if (meIndex === -1) {
        newMenus = cloneDeep(menus.concat(customList));
      } else {
        menus.splice(meIndex, 0, ...customList);
        newMenus = cloneDeep(menus);
      }
      setMenus(newMenus);
    }
  }, []);


  const [menus, setMenus] = useState([
    {
      name: '对话',
      icon: 'fa-solid fa-comment-dots',
      key: "1",
      url: '/ai/chat',
      access: access.chatOpen,
      checked: true,
      supportMobile: true,
    },
    {
      name: '应用',
      icon: 'fa-solid fa-layer-group',
      key: "2",
      url: '/ai/app',
      access: access.appOpen,
      checked: false,
      supportMobile: true,
    },
    {
      name: '绘画',
      icon: 'fa-solid fa-palette',
      key: "3",
      url: '/ai/draw',
      access: access.imageOpen,
      checked: false,
      supportMobile: true,
    },
    // {
    //   name: '场景',
    //   icon: 'fa-solid fa-window-restore',
    //   key: "4",
    //   url: '/ai/sence',
    //   access: access.senceOpen,
    //   checked: false,
    //   supportMobile: true,
    // },
    {
      name: '画廊',
      icon: 'fa-solid fa-images',
      key: "5",
      url: '/ai/gallery',
      access: access.galleryOpen,
      checked: false,
      supportMobile: true,
    },
	{
		name: 'AI工具',
		icon: 'fa-solid fa-images',
		key: "6",
		url: '/ai/tools',
		access: access.senceOpen,
		checked: false,
		supportMobile: true,
	  },
    {
      name: '我',
      icon: 'fa-solid fa-user',
      key: "7",
      url: '/ai/me',
      access: access.meOpen,
      checked: false,
      supportMobile: true,
    },
  ]);

  return { menus, setMenus };
};
