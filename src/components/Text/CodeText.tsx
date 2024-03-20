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

export const CodeText = ({ children }: { children: any}) => {
  const { styles } = useStyles();
  
  const getCodeString = (text: string) => {
	return "{{" + text + "}}"
  }

  return (
	<span className={styles.text}>{getCodeString(children)}</span>
  );
};
