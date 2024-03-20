import { Logo } from '@/components/Logo/index';
import { MyIcon } from '@/components/MyIcon';
import { isLogin } from '@/utils';
import { useModel, useNavigate } from '@umijs/max';
import { Button, Dropdown, Space, Tooltip, theme } from 'antd';
import { SwitchTheme } from '../../../../components/SwitchTheme/index';
import useStyles from './index.module.style';
import { CusIcon } from '@/components/Icon';
import { useEffect, useState } from 'react';
import { IUserInfo } from '@/types';
import {getUserInfo} from '@/utils/api';
import {Menus} from '../Menus';
import {useResponsive} from 'antd-style';

export const Header = () => {
  const { styles } = useStyles();
  const navigator = useNavigate();
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;
  const [userInfo, setUerInfo] = useState<Partial<IUserInfo>>({})
  const { mobile } = useResponsive();

  useEffect(() => {
	isLogin() && getInfo()
  }, [])

  const getInfo = async () => {
	try {
		const data = await getUserInfo()
		setUerInfo(data)
	} catch (error) {
		
	}
  }
	
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Logo></Logo>
        <span>{setting?.name}</span>
		{
				!mobile && <Menus className={styles.menus}></Menus>
			}
      </div>
      <div className={styles.right}>
        <Space size={[16, 16]}>
          <Tooltip title={'切换主题'}>
			<>
            <SwitchTheme></SwitchTheme>
			</>
          </Tooltip>
          {userInfo?.isAdmin === 1 && (
            <Tooltip title={'后台管理'}>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigator('/admin/panel');
                }}
              >
				<CusIcon icon="fa-solid fa-chart-bar" />
              </div>
            </Tooltip>
          )}

          <Me info={userInfo}></Me>
        </Space>
      </div>
    </div>
  );
};

export const Me = ({info}: {info: Partial<IUserInfo>}) => {
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const navgite = useNavigate();

  return (
    <>
      {isLogin() ? (
        <Dropdown
          menu={{
            items: [
              {
                key: '4',
                label: (
                  <div
                    onClick={() => {
                      localStorage.removeItem('token');
                      navgite('/login');
                    }}
                  >
                    注销登录
                  </div>
                ),
              },
            ],
          }}
        >
          <Button
            type="primary"
            ghost
            size="small"
            style={{ cursor: 'pointer' }}
          >
            <MyIcon
              type={'icon-wode1'}
              style={{
                color: token.colorPrimary,
              }}
              className={styles.icon}
            />
            {info?.nickName}
          </Button>
        </Dropdown>
      ) : (
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem('token');
            navgite('/login');
          }}
          ghost
          size="small"
          style={{ cursor: 'pointer' }}
        >
          <MyIcon
            type={'icon-wode1'}
            style={{
              color: token.colorPrimary,
            }}
            className={styles.icon}
          />
          登录
        </Button>
      )}
    </>
  );
};
