import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, cx, css }) => {
  const container = cx(css`
    flex: 1;
    height: ${token?.headerHeight};
    overflow: auto;
  `);

  return {
    container,
    avatarIcon: {
      marginRight: '8px',
      marginBottom: '8px',
      fontSize: '18px',
    },
    customUpload: {
      width: `80px !important`,
      height: 80,
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
    },
  };
});
export default useStyles;
