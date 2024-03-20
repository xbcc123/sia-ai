import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
	
  return {
    contanir: {
      padding: '16px',
      flex: '1',
      height: token.headerHeight,
	  overflow: 'auto',
      background: token.colorBgBase,
    },
    title: {
      textAlign: 'center',
      fontSize: token.fontSizeXL,
	  color: token.colorTextBase,
    },
    des: {
      marginTop: '12px',
      marginBottom: '12px',
      textAlign: 'center',
      color: token.colorText,
    },
    hanld: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'center',
    },
	content: {
		
	},
    empty: {
      color: token.colorTextSecondary,
    },
  };
});
export default useStyles;
