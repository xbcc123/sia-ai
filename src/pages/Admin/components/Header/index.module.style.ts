import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    container: {
      position: 'relative',
      zIndex: '999',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40px',
	  flexShrink: 0,
      borderBottom: `1px solid ${token.colorBorder}`,
	  background: token.colorBgBase,
	  color: token?.colorTextBase,
    },
    left: {
      display: 'flex',
      alignItems: 'center',
      '> img': { marginRight: '12px', width: '30px', height: '30px' },
    },
	right: {
		display: 'flex',
		alignItems: 'center'
	},
    icon: {
      fontSize: token.fontSize,
      marginRight: '2px',
    },
  };
});
export default useStyles;
