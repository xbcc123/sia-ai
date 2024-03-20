import { useModel } from '@umijs/max';
import { Carousel, Modal } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { AFooter } from '../../components/Footer/index';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RetrievePassword } from './components/RetrievePassword';
import useStyles from './index.module.style';
import {Meta} from '../../components/Meta/index';

export default () => {
  const [page, setPage] = useState<'login' | 'register' | 'retrievePassword'>(
    'login',
  );

  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');
  const { setting, protocolConfig } = initialState;

  const urlParams = useRef<any>();
  useEffect(() => {
    urlParams.current = new URLSearchParams(location.search);
    if (urlParams.current.get('type') === 'register') {
      setPage('register');
    }
  }, []);

  const contentStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center'
  };

  return (
    <>
	<Meta></Meta>
      <div className={styles.login}>
        <div className={styles.loginContent}>
          <div className={styles.left}>
            <Carousel autoplay style={{}}>
              {setting?.scrollList?.map?.((item: string) => {
                return (
                  <div style={contentStyle} key={item}>
                    <img
					  style={{width: '100%', height: 500, objectFit: 'cover', }}
                      src={
                        `${setting?.domain}${item}`
                      }
                      alt=""
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className={styles.right}>
            {page === 'login' && (
              <Login
                onChangePage={(page) => setPage(page)}
              ></Login>
            )}

            {page === 'register' && (
              <Register
                onChangePage={(page) => setPage(page)}
              ></Register>
            )}

            {page === 'retrievePassword' && (
              <RetrievePassword
                onChangePage={(page) => setPage(page)}
              ></RetrievePassword>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <AFooter></AFooter>
        </div>
      </div>
   
    </>
  );
};
