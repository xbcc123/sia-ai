import services from '@/services/ai';
import { Outlet, useModel } from '@umijs/max';
import { Button, Modal } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Menus } from './components/Menus';
import { MobileMenus } from './components/MobileMenus';
import useStyles from './index.module.style';
import { useResponsive } from 'antd-style';
import { isLogin } from '@/utils';
import {Meta} from '@/components/Meta/index';

export default () => {
  const [notifyHtmlContent, setNotifyHtmlContent] = useState('');
  const [notifyModalVisible, setNotifyModalVisible] = useState(false);
  const { styles } = useStyles();
  const { mobile } = useResponsive();

  useEffect(() => { 
	if (isLogin()) {
		getNotify();
	  } 
  }, []);

  const getNotify = async () => {
    if (moment(moment().format('YYYY-MM-DD')).isSame(localStorage.getItem('lastShownDate'))) {
      return;
    }
    localStorage.removeItem('lastShownDate');
    try {
      const data = await services.HomeController.notifyDefault();
      if (data) {
        setNotifyModalVisible(true);
        setNotifyHtmlContent(data);
      }
    } catch (error) {}
  };

  return (
      <div className={styles.contanir}>
        <Header></Header>
		<Meta></Meta>
        <div className={styles.content}>
			{/* {
				!mobile && <Menus className={styles.menus}></Menus>
			} */}
          <div className={styles.right}>
            <Outlet />
          </div>
        </div>
		{
			mobile &&  <MobileMenus className={styles.mobileMenus}></MobileMenus>
		}
        <Modal
          open={notifyModalVisible}
          title="站点公告"
          onCancel={() => setNotifyModalVisible(false)}
          footer={[
            <Button
              onClick={() => {
                localStorage.setItem('lastShownDate', moment().format('YYYY-MM-DD'));
                setNotifyModalVisible(false);
              }}
            >
              今日内不再弹出
            </Button>,
          ]}
        >
          <div dangerouslySetInnerHTML={{ __html: notifyHtmlContent }}></div>
        </Modal>
      </div>
    // </ThemeProvider>
  );
};
