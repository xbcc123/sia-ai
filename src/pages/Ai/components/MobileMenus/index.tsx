import { MyIcon } from '@/components/MyIcon';
import { useLocation, useNavigate } from '@umijs/max';
import { useEffect, useState } from 'react';
import useStyles from './index.module.style';
import {useMenus} from '@/hooks/menus';
import {CusIcon} from '@/components/Icon';
import {cloneDeep} from 'lodash';

export const MobileMenus = ({ className }: { className: string }) => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const {menus, setMenus} = useMenus()

 const changeCheckedStatus = (index: number) => {
    menus.forEach((menuItem) => {
      menuItem.checked = false;
    });
    menus[index].checked = true;
    setMenus(cloneDeep(menus));
  };

  useEffect(() => {
	const lastMenusKey = localStorage.getItem('lastMenusKey')
	menus.forEach(item => {
		item.checked = false
		if(item.key === lastMenusKey) {
			item.checked = true
		}
	})
	setMenus(cloneDeep(menus))
  }, [location.pathname]);

  const onClickItem = ({url, value, action, key}: any, index: number) => {
	if(action === 'link') {
		window.open(value)
		return
	}
	if(action === 'inner') {
		return
	}
    if (url === '/ai/me') {
      navigate('/ai/me/profile');
    } else if (url === '/ai/product-introduction') {

    } else {
      navigate(url);
    }
	localStorage.setItem('lastMenusKey', key)
    changeCheckedStatus(index);
  };

  return (
    <div className={`${className} ${styles.contanir} `}>
      {menus.filter(item => item.access).filter(item => item.supportMobile)?.map?.((item, index) => {
        return (
          <div
            onClick={() => {
              onClickItem(item, index);
            }}
            key={index}
            className={`${styles.proItem}  ${item.checked ? styles.proItemActive : ''}`}
          >
			<CusIcon icon={item.icon} style={{ fontSize: 18}}></CusIcon>
            <div className={styles.word}>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};
