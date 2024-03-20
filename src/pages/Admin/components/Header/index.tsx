import { MyIcon } from '@/components/MyIcon';
import { BarChartOutlined } from '@ant-design/icons';
import { useModel, useNavigate } from '@umijs/max';
import { Button, Dropdown, theme } from 'antd';
import useStyles from './index.module.style';
import {Logo} from '@/components/Logo/index';

export const IHeader = () => {
  const { styles } = useStyles();
  const navigator = useNavigate();
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
		<Logo></Logo>
        <span>{setting?.name}</span>
      </div>
      <div className={styles.right}>
        <div
          style={{ marginRight: 16, cursor: 'pointer' }}
          onClick={() => {
            navigator('/ai');
			localStorage.setItem('lastMenusKey', '1');
		}}
        >
          <BarChartOutlined style={{ marginRight: 8 }} />
          客户端
        </div>
        <Me></Me>
      </div>
    </div>
  );
};

export const Me = () => {
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const navgite = useNavigate();
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '4',
            label: (
              <div
                onClick={() => {
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
      <Button type="primary" ghost size="small" style={{ cursor: 'pointer' }}>
        <MyIcon
          type={'icon-wode'}
          style={{
            color: token.colorPrimary,
          }}
          className={styles.icon}
        />
        我的
      </Button>
    </Dropdown>
  );
};
