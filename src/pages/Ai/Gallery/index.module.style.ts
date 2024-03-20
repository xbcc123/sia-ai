import { createStyles, cx } from 'antd-style';

const useStyles = createStyles(({ token, css }) => {
  const imgItemContent = cx(css`
    padding: 8px 16px;
    margin: 0 auto;
    left: 0px;
    right: 0px;
    bottom: 0px;
	transform: translateY(calc(100% + 20px));
    width: calc(100% - 16px);
    position: absolute;
    border-radius: 8px;
    font-size: 12px;
    overflow: hidden;
    color: #fff;
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.8);
  `);

  return {
    contanir: {
      flex: '1',
	  background: token.colorBgBase,
      overflow: 'auto',
      height: token.headerHeight,
    },
    imgList: {
      margin: '0 auto',
      columnCount: '4',
      columnGap: '10px',
      padding: '10px',
      '@media screen and (max-width: 450px)': { columnCount: '2' },
    },
	imgItemContent,
    imgItem: {
      position: 'relative',
      width: '100%',
      borderRadius: token.borderRadius,
      marginBottom: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      '> img': { width: '100%', verticalAlign: 'middle' },
     [`&:hover .${imgItemContent}`]: { transform: 'translateY(0px)', transition: 'all 0.3s' },
    },
    // imgItemContent: {
    //   padding: '8px 16px',
    //   margin: '0 auto',
    //   left: '0px',
    //   right: '0px',
    //   bottom: 0,
    //   width: 'calc(100% - 16px)',
    //   position: 'absolute',
    //   borderRadius: '8px',
    //   fontSize: '12px',
    //   overflow: 'hidden',
    //   color: '#fff',
    //   marginBottom: '20px',
    //   background: 'rgba(0, 0, 0, .9)',
    // },
    itemContetTop: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    itemContetText: {
      marginTop: '8px',
    },
  };
});
export default useStyles;
