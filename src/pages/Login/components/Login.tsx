import { CusIcon } from '@/components/Icon';
import { useModel } from '@umijs/max';
import { Divider, Segmented, theme } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { EmailCodeLogin } from './EmailCodeLogin';
import { EmailLogin } from './EmailLogin';
import { WeChatLoginModal } from './WeChatLogin';

type LoginType = 'passwordLogin' | 'codeLogin';

export const Login = ({
  onChangePage,
}: {
  onChangePage: (page: 'login' | 'register' | 'retrievePassword') => void;
}) => {
  const [loginType, setLoginType] = useState<LoginType>('passwordLogin'); // ['passwordLogin', 'codeLogin'
  const { styles } = useStyles();
  const { token } = theme.useToken();
  const [weChatVisible, setWeChatVisible] = useState<boolean>(false);
  const { initialState, refresh } = useModel('@@initialState');
  const { loginSetting } = initialState;

  //  是否开启账号邮箱登录
  const showInput = loginSetting?.openPhone || loginSetting?.openEmail;

  return (
    <>
      {showInput && (
        <Segmented
          style={{ marginBottom: 32 }}
          size="large"
          onChange={(value) => {
            setLoginType(value as LoginType);
          }}
          options={[
            {
              label: '密码登录',
              value: 'passwordLogin',
            },
            {
              label: '验证码登录',
              value: 'codeLogin',
            },
          ]}
        />
      )}

      {loginType === 'passwordLogin' && showInput && <EmailLogin></EmailLogin>}

      {loginType === 'codeLogin' && showInput && (
        <EmailCodeLogin></EmailCodeLogin>
      )}

      <Divider>
        <span style={{ fontSize: 12 }}>第三方登录</span>
      </Divider>
      <div className={styles.threeLogin}>
        {loginSetting?.openWxPublic && (
          <div
            className={styles.threeLoginBox}
            onClick={() => {
              setWeChatVisible(true);
            }}
          >
            <CusIcon
              icon={'fa-brands fa-weixin'}
              className={styles.threeLoginBoxIcon}
            ></CusIcon>
            微信登录
          </div>
        )}
   
      </div>

      <WeChatLoginModal
        type="login"
        visible={weChatVisible}
        onCancel={function (): void {
          setWeChatVisible(false);
        }}
      ></WeChatLoginModal>

      {showInput && <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 32,
        }}
      >
        <div>
          没有账号？{' '}
          <span
            className={styles.color1}
            style={{
              color: token.colorPrimary,
            }}
            onClick={() => onChangePage('register')}
          >
            立即注册
          </span>
        </div>
        <div>
          忘记密码？
          <span
            className={styles.color1}
            style={{
              color: token.colorPrimary,
            }}
            onClick={() => onChangePage('retrievePassword')}
          >
            找回密码
          </span>
        </div>
      </div>}
    </>
  );
};

const useStyles = createStyles(({ token }) => {
  return {
    color1: {
      cursor: 'pointer',
    },
    threeLogin: {
      display: 'flex',
      justifyContent: 'center',
    },
    threeLoginBox: {
      cursor: 'pointer',
      fontSize: token?.fontSize,
      padding: '2px 8px',
      background: '#10a310',
      color: token?.colorBgBase,
      borderRadius: token?.borderRadius,
    },
    threeLoginBoxIcon: {
      marginRight: 4,
    },
  };
});
