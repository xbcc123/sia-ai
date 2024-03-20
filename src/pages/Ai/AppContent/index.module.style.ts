import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css, responsive }) => {
  const appContetTitle = cx(css`
    font-size: ${token.fontSize};
    font-weight: 500;
  `);
  const appContentDes = cx(css`
    color: ${token.colorTextTertiary};
    font-size: 12px;
  `);

  const appContentTransformRight = cx(css`
 	 display: flex;
	 transition: all .3s;
	  transform: translate(120px)
  `)

   const contanir = cx(css`
		padding: 32px;
		background: ${token.colorBgBase};
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: ${token.headerHeight};

		${responsive.mobile} {
			padding: 16px;
		  }
   `)
	
  return {
    contanir,
    appList: {
      flex: '1',
      overflow: 'auto',
      marginTop: '16px',
      overflowX: 'hidden',
      overflowY: 'auto',
    },
    appTitle: {
      marginTop: '8px',
      marginBottom: '8px',
      fontWeight: '500',
      color: token.colorTextBase,
      cursor: 'pointer',
      '&:hover': {
        color: token.colorPrimary,
      },
    },
    appContentList: {},
    appContentActive: {},
    appContent: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px',
      background: token.colorFillQuaternary,
      borderRadius: token.borderRadius,
      cursor: 'pointer',
	  overflow: 'hidden',
      '&:hover': {
        background: token?.colorPrimaryBg,
        [`.${appContetTitle}`]: { color: token.colorPrimaryTextHover },
        [`.${appContentDes}`]: { color: token.colorPrimaryTextHover },
		[`.${appContentTransformRight}`]: {
			transform: 'translate(0px)'
		}
      },
    },
    appContetTitle,
    appContentIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30px',
      height: '30px',
      borderRadius: '30px',
      padding: '8px',
      marginRight: '16px',
      color: token.colorTextBase,
      background: token.colorFill,
    },
    appContentRight: {
      flex: '1',
      overflow: 'hidden',
      width: '0',
    },
	icon: {
		color: token.colorPrimary,
	},
	appContentTransformRight,
    appContentDes,
  };
});

export default useStyles;
