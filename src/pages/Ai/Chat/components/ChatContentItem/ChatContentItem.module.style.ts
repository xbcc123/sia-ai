import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    chatItem: {
      display: 'flex',
      padding: '16px',
	  color: token.colorTextBase,
	  fontSize: token.fontSize
    },
    chatItemGpt: {
      background: token.colorFillTertiary,
      borderRadius: token.borderRadius,
    },
    chatItemContent: {
      marginLeft: '8px',
    },
	chatItemAva: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 32,
		height: 32,
		borderRadius: '50%',
		flexShrink: 0,
		// background: token.colorFill
	},
	chat: {

	},
	chatItemTxt: {
		marginTop: 4,
		// wordWrap: 'break-word',
		// maxWidth: '1000px'
	},
    chatItemTools: {
      fontSize: '12px',
      color: token.colorTextTertiary,
      '> div': { display: 'flex', alignItems: 'center', marginRight: '8px' },
    },
  };
});
export default useStyles;
