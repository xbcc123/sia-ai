import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}, props) => {
	const {mobile} = props?.responsive || {} 
   return {
    slider: {
      position: 'relative',
	  background: token.colorBgBase,
      zIndex: '1',
      '@media screen and (max-width: 450px)': {
        position: 'absolute',
        background: token.colorBgBase,
        zIndex: '10',
      },
    },
    contanir: {
      height: token.headerHeight,
      overflow: 'auto',
      transition: 'all 0.3s',
      zIndex: '1',
      position: 'relative',
      background: token.colorBgBase,
      '@media screen and (max-width: 450px)': { zIndex: '11' },
    },
    contanirActive: {
      opacity: '0',
      transform: 'translate(-100%)',
    },
    collapsedIcon: {
      position: 'absolute',
      right: '0',
      zIndex: '12',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width:  mobile ? 40 : 50,
      height: mobile ? 40 : 50,
	  fontSize: mobile ? 18 : token.fontSize,
      borderRadius: '50%',
      background: token.colorBgBase,
	  color: token.colorText,
      transform: 'translateX(50%) translateY(30vh)',
      cursor: 'pointer',
	  "&:hover": {
		background: token?.colorPrimaryBg
	  }
    },
    mask: {
      '@media screen and (max-width: 450px)': {
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '9',
        background: token.colorBgMask,
      },
    },
  };
});
export default useStyles;
