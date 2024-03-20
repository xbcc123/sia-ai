import {
  AppstoreOutlined,
  BarChartOutlined,
  BarcodeOutlined,
  BellOutlined,
  BlockOutlined,
  CommentOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  MessageOutlined,
  PictureOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  SketchOutlined,
  SoundOutlined,
  ThunderboltOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {Outlet, useNavigate, useModel, useLocation} from '@umijs/max';
import { Layout, Menu, MenuProps } from 'antd';
import { ThemeProvider, useResponsive } from 'antd-style';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import {useState, useEffect} from 'react';
import { IHeader } from './components/Header/index';
import useStyles from './index.module.style';
import { Meta } from '@/components/Meta';

let rootSubmenuKeys: string[] = [];
type MenuItem = Required<MenuProps>['items'][number];

export default () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const {themeProvider} = useModel('themeProvider')
  const [items, setItems] = useState<MenuItem[]>([
    {
      key: '/admin/panel',
      label: '数据中心',
      icon: <BarChartOutlined />,
    },
    {
      key: '/admin/chat',
      label: '对话管理',
      icon: <CommentOutlined />,
      children: [
        {
          key: '/admin/chat/chat',
          label: '对话管理',
          icon: <CommentOutlined />,
        },
        {
          key: '/admin/chat/message',
          label: '消息管理',
          icon: <SoundOutlined />,
        },
		{
			key: '/admin/chat/pool',
			label: '账号配置',
			icon: <MessageOutlined />,
		  },
		  {
			key: '/admin/site/chat',
			label: '系统配置',
			icon: <MessageOutlined />,
		  },
      ],
    },
    {
      key: '/admin/draw',
      label: '绘画管理',
      icon: <ThunderboltOutlined />,
	  children: [
        {
          key: '/admin/draw/draw',
          label: '绘画管理',
          icon: <ThunderboltOutlined />,
        },
        {
          key: '/admin/draw/pool',
          label: '账号配置',
          icon: <BlockOutlined />,
        },
		{
			key: '/admin/site/draw',
			label: '系统配置',
			icon: <PictureOutlined />,
		  },
      ],
    },
	{
      key: '/admin/app',
      label: '应用管理',
      icon: <AppstoreOutlined />,
    },
    {
      key: '/admin/class',
      label: '分类管理',
      icon: <BlockOutlined />,
    },
 {
      key: '/admin/user',
      label: '用户管理',
      icon: <UsergroupAddOutlined />,
      children: [
        {
          key: '/admin/user/user',
          label: '用户管理',
          icon: <UsergroupAddOutlined />,
        },
        {
          key: '/admin/user/plan',
          label: '用户套餐管理',
          icon: <UserAddOutlined />
        },
      ],
    },
    {
      key: '/admin/plan',
      label: '套餐管理',
      icon: <SketchOutlined />,
      children: [
        {
          key: '/admin/plan/plan',
          label: '套餐管理',
          icon: <SketchOutlined />,
        },
        {
          key: '/admin/plan/class',
          label: '套餐分类管理',
          icon: <BarChartOutlined />,
        },
      ],
    },
    {
      key: '/admin/exChangeCode',
      label: '兑换码管理',
      icon: <BarcodeOutlined />,
    },
	{
      key: '/admin/order',
      label: '订单管理',
      icon: <BellOutlined />,
    },
    // {
    //   key: '/admin/content',
    //   label: '内容安全',
    //   icon: <MenuUnfoldOutlined />,
    // },
	{
		key: '/admin/site/menus',
		label: '菜单配置',
		icon: <AppstoreOutlined />,
	  },
	  {
		key: '/admin/site/global',
		label: '站点配置',
		icon: <GlobalOutlined />,
	  },
	  {
		key: '/admin/site/security',
		label: '内容审核',
		icon: <SafetyCertificateOutlined />,
	  },
	  {
		key: '/admin/site/protocol',
		label: '用户协议',
		icon: <FileDoneOutlined />,
	  },
    // {
    //   key: '/admin/site',
    //   label: '站点配置',
    //   icon: <SettingOutlined />,
    //   children: [
    //     // {
    //     //   key: '/admin/site/authorization-activation',
    //     //   label: '授权激活',
    //     //   icon: <UnlockOutlined />,
    //     // },
    //   ],
    // },
    // {
    //   key: '/admin/site',
    //   label: '站点设置',
    //   icon: <MenuUnfoldOutlined />,
    // },
  ]);

  useEffect(() => {
    const index = items.findIndex((item: any) =>
      location.pathname.includes(item.key),
    );
    if (index !== -1) {
		if(rootSubmenuKeys.length > 0) {
			 setOpenKeys(rootSubmenuKeys)
		}else {
		  const openKey =  location?.pathname?.split('/')?.slice(0, -1)?.join('/') 
		  setOpenKeys([openKey])
		}
		setSelectedKeys([location.pathname])
    }
  }, [location.pathname]);


  const onSelect = ({selectedKeys}: any) => {
	setSelectedKeys(selectedKeys)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys): any => {
      setOpenKeys(keys);
	  rootSubmenuKeys = keys
  };

  return (
      <Layout className={styles.contanir}>
        <IHeader></IHeader>
		<Meta></Meta>
        <Layout>
          <Sider
            breakpoint="sm"
            theme="light"
            collapsedWidth="0"
			style={{
				height: "calc(100vh - 40px)",
				overflow: 'auto'
			}}
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }}
          >
            <Menu
              mode="inline"
              openKeys={openKeys}
			  selectedKeys={selectedKeys}
			  onSelect={onSelect}
              onOpenChange={onOpenChange}
              items={items}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
          </Sider>
          <Content className={styles.contentWrapper}>
            <div className={styles.content}>
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    // </ThemeProvider>
  );
};
