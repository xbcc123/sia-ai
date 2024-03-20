import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    contanir: {
      display: 'flex',
	  height: '100vh',
    },
	contentWrapper: {
		padding: '16px',
		flex: '1',
		overflow: 'auto',
	},
    content: {
    },
  };
});
export default useStyles;
