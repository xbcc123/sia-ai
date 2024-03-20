import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    text: {
      marginLeft: 8,
      fontSize: 12,
	  color: '#666'
    },
  };
});

export const SubText = ({ children }: { children: any}) => {
  const { styles } = useStyles();

  return (
	<span className={styles.text}>{children}</span>
  );
};
