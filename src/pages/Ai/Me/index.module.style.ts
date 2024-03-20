import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    container: {
      width: '100%',
      display: 'flex',
	  background: token.colorBgBase,
    },
    content: {
      padding: '16px',
      flex: '1',
	  background: token.colorBgBase,
    },
	avaContent: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '16px',
		'& > img': {
		  display: 'inline-block',
		  cursor: 'pointer',
		  background: '#CCCCCC',
		  width: '90px',
		  height: '90px',
		  borderRadius: token.borderRadius,
		  '&:hover': {
			opacity: '0.8',
		  },
		},
	}
  };
});
export default useStyles;
