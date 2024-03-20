import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    contanir: {
		flex: "1",
		padding: "16px",
		background: token.colorBgBase,
		height: token.headerHeight,
    },
	back: {
		marginLeft: 8, 
		cursor: 'pointer',
		"&:hover": {
			background: token?.colorPrimary,
		}	
	}
  };
});
export default useStyles;
