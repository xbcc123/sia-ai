import { LeftOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { CSSProperties } from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    back: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		width: 50,
		height: 50,
		borderRadius: "50%",
		fontSize: token.sizeLG,
		"&:hover": {
			background: token?.colorFillTertiary
		}
	},
  };
});

export const Back = ({onClick, style}: {onClick: () => void, style?: CSSProperties}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.back} style={{...style}} onClick={onClick}>
      <LeftOutlined />
    </div>
  );
};
