import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
	imgUrl: {
		marginTop: 8,
		display: 'flex',
		justifyContent: 'center',
	},
    flexBottom: {
      display: 'flex',
      justifyContent: 'center',
	  marginTop:8
    },
    imgBottom: {
      marginTop: '16px',
    },
  };
});
export default useStyles;
