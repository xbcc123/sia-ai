import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
    },
    content: {
      flex: '1',
      display: 'flex',
    },
    right: {
      flex: '1',
	  background: token.colorBgBase
    },
	menus: {

	},
	mobileMenus: {

	},
  };
});
export default useStyles;
