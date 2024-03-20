import { createStyles } from 'antd-style';

const useStyles = createStyles(({token, responsive}) => {
  return {
    contanir: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
	  height: 'calc(100vh - 100px)',
	  [responsive.mobile]: {
		height: 'calc(100vh - 142px)' 
	  },
    },
    content: {
      flex: '1',
      padding: '16px',
    },
	img: {
		width: 100,
		height: 100,
		objectFit: 'cover',
	  },
    subTitle: {
      marginBottom: '8px',
    },
    bottom: {
	  height: "70px",
	  [responsive.mobile]: {
		height: 50 
	  },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '16px',
    //   borderTop: `1px solid ${token.colorBorderSecondary}`,
    },
  };
});
export default useStyles;
