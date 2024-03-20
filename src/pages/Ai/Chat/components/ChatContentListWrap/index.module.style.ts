import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
      position: 'relative',
      flex: '1',
      flexDirection: 'column',
      display: 'flex',
      padding: '16px',
      background: token.colorBgBase,
      height: token.headerHeight,
    },
    menus: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menusLeft: {
      fontSize: '16px',
	  color: token.colorTextBase
    },
    menusRight: {
      display: 'flex',
      alignItems: 'center',
      '> span': { cursor: 'pointer',},
    },
    chatItem: {
      display: 'flex',
      alignItems: 'center',
    },
    contentListWrap: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: '1',
	  overflow: 'auto',
    },
    chatItemTools: {
      display: 'flex',
    },

  };
});
export default useStyles;
