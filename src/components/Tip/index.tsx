import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { CSSProperties } from 'react';

const useStyles = createStyles(({token}) => {
  return {
    tip: {
      marginBottom: '16px',
      padding: '8px',
      borderRadius: token.borderRadius,
      background: token.colorPrimaryBg,
	  color: token.colorTextBase
    },
    title: {
      fontSize: '14px',
      fontWeight: '500',
    },
    img: {
      width: 100,
      height: 100,
      objectFit: 'cover',
    },
    des: {
      marginTop: '4px',
      fontSize: '12px',
    },
  };
});

export const Tip = ({ title = '', des = '', style }: { title?: any; des?: any, style?: CSSProperties }) => {
  const { styles } = useStyles();

  return (
    <div className={styles.tip} style={style}>
      <div className={styles.title}>
        <ExclamationCircleOutlined style={{ marginRight: 8 }} />
        {title}
      </div>
      <div className={styles.des}>{des}</div>
    </div>
  );
};
