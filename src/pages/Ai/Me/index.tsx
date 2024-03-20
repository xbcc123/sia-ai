import { MSlider } from '@/components/MSlider';
import { MyIcon } from '@/components/MyIcon';
import { Outlet, useLocation, useNavigate } from '@umijs/max';
import { Menu } from 'antd';
import { useResponsive } from 'antd-style';
import { useEffect, useState } from 'react';
import useStyles from './index.module.style';
import { isMobile } from '@/utils';

export default () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { mobile } = useResponsive();

  const [items, setItems] = useState([
    {
      key: '/ai/me/profile',
      icon: <MyIcon type="icon-wode1"></MyIcon>,
      label: '个人资料',
    },
    {
      key: '/ai/me/plan',
      icon: <MyIcon type="icon-zuanshi"></MyIcon>,
      label: '套餐管理',
    },
    {
      key: '/ai/me/product',
      icon: <MyIcon type="icon-qianbao"></MyIcon>,
      label: '套餐商店',
    },
    {
      key: '/ai/me/invite',
      icon: <MyIcon type="icon-yaoqingyouli"></MyIcon>,
      label: '分享应用',
    },
    {
      key: '/ai/me/security',
      icon: <MyIcon type="icon-qianbao"></MyIcon>,
      label: '账户安全',
    },
  ]);

  useEffect(() => {
    if (items.find((item) => item.key === location.pathname) !== undefined) {
      changeCheckedStatus(location.pathname);
    }
  }, [location.pathname]);

  const changeCheckedStatus = (key: any) => {
    setSelectedKeys([key]);
  };

  const onClickItem = (key: any) => {
    navigate(key);
    changeCheckedStatus(key);
  };

  return (
    <div className={styles.container}>
      <MSlider defCollapsed={!isMobile()} width={170}>
        <Menu
          mode="inline"
          style={{ width: 170, marginTop: 12, border: 'none' }}
          selectedKeys={selectedKeys}
          onClick={({ key }) => {
            onClickItem(key);
          }}
          items={items}
        />
      </MSlider>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
