import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    productCard: {
      flex: '0 0 calc((100% - 32px * 2) / 3)',
      border: '1px solid #775d83',
      borderRadius: token.borderRadius,
      cursor: 'pointer',
      '&Color1': { background: 'linear-gradient(215deg, #5c0a85, #94595900)' },
      '&Color2': { background: 'linear-gradient(215deg, #40347e, #94595900)' },
      '&Color3': { background: 'linear-gradient(215deg, #1e457f, #94595900)' },
      '&:hover': {
        transition: 'all .3s linear',
        transform: 'scale(1.01)',
        boxShadow: '1px 3px 13px 1px #9a05e0',
      },
    },
    top: {
      fontSize: '16px',
      textAlign: 'center',
      marginTop: '8px',
    },
    subTitle: {
      marginLeft: '4px',
      fontSize: '14px',
      color: '#eee',
    },
    bottom: {
      textIndent: '30px',
      lineHeight: '2',
      padding: '12px',
    },
  };
});
export default useStyles;
