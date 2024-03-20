import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      paddingTop: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
	  background: token.colorBgBase,
    },
  };
});
export default useStyles;
