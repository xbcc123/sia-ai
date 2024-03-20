import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      flex: '1',
      background: token.colorBgBase,
      overflow: 'auto',
    },
  };
});
export default useStyles;
