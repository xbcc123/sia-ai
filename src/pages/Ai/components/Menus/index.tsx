import { CusIcon } from '@/components/Icon';
import { useMenus } from '@/hooks/menus';
import { useNavigate } from '@umijs/max';
import { cloneDeep } from 'lodash';
import useStyles from './index.module.style';
import {useEffect} from 'react';

export const Menus = ({ className }: { className: string }) => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { menus, setMenus } = useMenus();

  const changeCheckedStatus = (item: any) => {
    menus.forEach((menuItem) => {
      menuItem.checked = false;
    });
    menus[menus.findIndex((menusItem) => menusItem.key === item.key)].checked =
      true;
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

  const onClickItem = (item: any, index: number) => {
    const { action, value, url } = item;
    if (action === 'link') {
      window.open(value);
      return;
    } else if (action === 'inner') {
      navigate(`/ai/iframe?url=${value}`);
    } else if (url === '/ai/me') {
      navigate('/ai/me/profile');
    } else if (url === '/ai/product-introduction') {
    } else {
      navigate(url);
    }
	localStorage.setItem('lastMenusKey', item.key)
    changeCheckedStatus(item);
  };

  return (
    <div className={`${styles.contanir} ${className}`}>
      {menus
        .filter((item) => item.access)
        ?.map?.((item, index) => {
          return (
            <div
              onClick={() => {
                onClickItem(item, index);
              }}
              key={index}
              className={`${styles.proItem}  ${
                item.checked ? styles.proItemActive : ''
              }`}
            >
              <CusIcon icon={item.icon} style={{ fontSize: 18 }}></CusIcon>
              <div className={styles.word}>{item.name}</div>
            </div>
          );
        })}
    </div>
  );
};
