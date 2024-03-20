import { createStyles } from 'antd-style';

const useStyles = createStyles(({token}) => {
  return {
    container: {
      height: 'calc(100vh - 100px)',
      overflow: 'auto',
    },
    item: {
      marginBottom: '16px',
      cursor: 'pointer',
      width: '100%',
      padding: '12px',
	  paddingTop: 16,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      border: `1px solid ${token.colorBorderSecondary}`,
    },
    itemTop: {
      fontSize: '16px',
      fontWeight: '500',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    itemDes: {
      color: token.colorTextSecondary,
      padding: '16px',
    },
    itemDay: {
      marginTop: '8px',
      textAlign: 'center',
    },
    itemPoints: {
      marginTop: '8px',
      textAlign: 'center',
    },
	itemActiveText: {
		color: token.colorPrimaryTextActive, 
		fontSize: 16, 
		margin: '0 4px'
	},
    itemPay: {
      margin: '0 auto',
      marginTop: '16px',
	  marginBottom: 8
    },
    payModal: {
      fontSize: '16px',
    },
    payModalTitle: {
      marginBottom: '8px',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    payModalTitleIcon: {
      marginRight: '4px',
    },
    payModalName: {
      marginBottom: '8px',
      fontSize: token.fontSize,
    },
    payModalPrice: {
      marginBottom: '8px',
      fontSize: token.fontSize,
    },
    payModalType: {
      marginBottom: '4px',
      fontSize: token.fontSize,
    },
  };
});
export default useStyles;
