import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      padding: '8px',
	  paddingBottom: 0,
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: token.headerHeight,
    },
    imgList: {
	 padding: '8px',
      flex: '1',
      overflow: 'auto',
	  background: token.colorBgBase
    },
  };
});
export default useStyles;
