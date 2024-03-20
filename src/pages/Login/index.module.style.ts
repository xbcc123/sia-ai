import { createStyles } from 'antd-style';

const useStyles = createStyles(({token, responsive}) => {
  return {
    login: {
      background: token.colorPrimaryBg,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginContent: {
      padding: '20px 40px',
      minHeight: '70%',
      width: '90%',
      background: token.colorBgBase,
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)',
    },
    left: {
	  width: '60%',
	  marginRight: 36,
      flexShrink: 0,
      '@media screen and (max-width: 450px)': { display: 'none' },
    },
    right: {
		width: responsive?.mobile ? '100%' :'35%',
    },
	bottom: {
		position: "fixed",
		height: 40,
		bottom: 0,
		color: token.colorTextDescription
	},
  };
});
export default useStyles;
