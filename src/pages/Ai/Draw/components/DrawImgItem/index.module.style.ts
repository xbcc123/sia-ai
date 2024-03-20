import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    imgItem: {
      background: token.colorBgBase,
      borderRadius: token.borderRadius,
	  overflow: 'hidden'
    },
    imgWrap: {
      cursor: 'pointer',
	  height: 260,
      '> img': { width: '100%', height: '100%', objectFit: 'contain' },
    },
    bottom: {
      padding: '8px 0px',
	  background: token.colorBgContainer,
	  color: token.colorTextBase
    },
    hanld1: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    hanld2: {
      marginTop: '8px',
      display: 'flex',
      justifyContent: 'space-between',
	  alignItems: 'center'
    },
    hanld2Time: {
      fontSize: 12,
	  color: token.colorTextTertiary
    },
    flexBottom: {
      display: 'flex',
      justifyContent: 'center',
    },
    imgBottom: {
      marginTop: '16px',
    },
  };
});
export default useStyles;
