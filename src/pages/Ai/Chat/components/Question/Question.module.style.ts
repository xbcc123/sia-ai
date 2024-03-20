import { createStyles } from 'antd-style';

const useStyles = createStyles(({token, responsive}) => {
  return {
    question: {
      paddingTop: '10px',
      '> div': { cursor: 'pointer' },
    },
    questionTools: {
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    questionClear: {
      cursor: 'pointer',
    },

	bottom: {
		paddingBottom: 24
	},
	stopMessage: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		width: responsive?.mobile ? 80 : 150,
		borderRadius: token.borderRadius,
		fontSize: 12,
		color: token.colorPrimary,
		border: `1px solid ${token.colorBorder}`,
		borderColor: token.colorPrimary,
		textAlign: 'center',
		opacity: '.8'
	},
  };
});
export default useStyles;
