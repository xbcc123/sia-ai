import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }) => {
//   const chatItemRight = cx(css`
//     transform: translate(60px);
//     display: flex;
//     align-self: center;
//     transition: all 0.3s;
//   `);

  return {
    contanir: {
		flex: '1',
		padding: 16,
		// paddingLeft: 64,
		background: token.colorBgBase,
		overflow: 'auto',
		height: token.headerHeight,
	},
  };
});

export default useStyles;
