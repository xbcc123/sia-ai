import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    contanir: {
      padding: "16px",
      flex: "1",
	  background: token.colorBgBase,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: token.headerHeight,
    },
    appList: {
      flex: "1",
      overflow: "auto",
	  overflowX: "hidden",
	  overflowY: "auto",
    },
	appTitle: {
		marginTop: "8px",
		marginBottom: "8px",
		fontSize: token.fontSizeLG,
		fontWeight: "500",
		color: token.colorTextBase,
		cursor: "pointer",
		"&:hover": { color: token.colorPrimary },
	  },
	  appContentList: {
		display: 'flex',
		width: '100%'
	  },
	  appContentActive: {},
	  appContent: {
		background: token.colorFillQuaternary,
		borderRadius: token.borderRadius,
		cursor: "pointer",
		overflow: 'hidden',
		"> img":{
			width: '100%',
		}
	  },
	  appContentButtom: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 8,
		color: token.colorTextBase,
		fontSize: token.fontSize
	  },
	  button: {

	  }

	
  };
});

export default useStyles;
