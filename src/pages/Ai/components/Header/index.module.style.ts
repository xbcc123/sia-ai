import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    container: {
      position: 'relative',
      zIndex: '999',
      background: token.colorBgBase,
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40px',
    //   borderBottom: `1px solid ${token.colorBorder}`,
	  boxShadow: '1px 1px 8px 0px rgba(17,20,24,.1)',
	  flexShrink: 0,
	  fontSize: token.fontSize,
	  color: token?.colorTextBase
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      '> img': { marginRight: '12px', width: '30px', height: '30px' },
    },
	menus: {
		paddingLeft: 24
	},
	right: {
		display: 'flex',
		alignItems: 'center',
	},
    icon: {
      fontSize: token.fontSize,
      marginRight: '0px',
    },
  };
});
export default useStyles;
