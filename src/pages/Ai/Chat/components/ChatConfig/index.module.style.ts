import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }) => {
  const chatItemRight = cx(css`
    transform: translate(60px);
    display: flex;
    align-self: center;
    transition: all 0.3s;
  `);

  return {
    container: {

	},
    inputWrap: {
      display: 'flex',
      width: '100%',
      marginBottom: 16,
    },
    chatList: {
      overflow: 'auto',
    },
    chatItem: {
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      padding: '10px',
      color: token.colorTextBase,
      backgroundColor: token.colorFillQuaternary,
      borderRadius: token.borderRadius,
      cursor: 'pointer',
      transition: 'all 0.06s',
      overflow: 'hidden',
      '&:hover': {
        color: token.colorPrimary,
        background: token.colorPrimaryBg,
        // [`.${chatItemRight}`]: { transform: 'translate(0px)' },
      },
    },
	isPinned: {
		background: token.colorFillSecondary
	},
    chatItemLeft: {
      flex: 1,
    },
    chatItemRight,
    chatItemActive: {
      color: token.colorPrimary,
      background: token.colorPrimaryBg,
	  [`.${chatItemRight}`]: { transform: 'translate(0px)' },
    },
    upDateTime: {
      fontSize: 12,
      color: token.colorTextTertiary,
    },
    icon: {
      color: token.colorPrimary,
    },
  };
});

export default useStyles;
