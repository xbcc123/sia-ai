import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      display: 'flex',
      width: '100%',
	  background: token.colorBgBase,
    },
  };
});
export default useStyles;
