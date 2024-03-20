import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    aiRadio: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    aiRadioItem: {
	  background: token?.colorBgBase,
      position: 'relative',
      width: 128,
      height: '52px',
      borderRadius:  token.borderRadius,
      overflow: 'hidden',
      cursor: 'pointer',
	  border: `2px solid ${token.colorBorder}`,
      '> img': { width: '100%', height: '100%', objectFit: 'fill' },
      '&:hover': { border: `2px solid ${token.colorPrimary}` },
      '&.aiRadioItemActive': {},
    },
    aiRadioItemText: {
    //   background: 'rgba(255, 255, 255, 0.3)',
      width: '100%',
      height: '100%',
      position: 'absolute',
	  top: '3px',
      bottom: '0',
      fontSize: '12px',
      textAlign: 'center',
    },
    aiRadioItemActive: {
      border: `2px solid ${token.colorPrimary}`,
    },
  };
});

export const AiRadio = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { styles } = useStyles();
  const [aiRadioList,] = useState([
    {
      title: 'Midjourney',
      des: '通用风格',
      value: 'mj',
    },
    {
      title: 'Niji',
      des: '动漫风格',
      value: 'niji',
    },
  ]);
  const [radioIndex, setRadioIndex] = useState(0)

  useEffect(() => {
	if(value !== undefined) {
		setRadioIndex(aiRadioList.findIndex(item => item.value === value))
	}
  }, [value])
  
  return (
    <div className={styles.aiRadio}>
      {aiRadioList?.map?.((item, index) => {
        return (
          <div
		  onClick={() => {
			setRadioIndex(index)
			onChange?.(aiRadioList[index].value)
		  }}
            key={item.value}
            className={`${
				radioIndex === index ? styles.aiRadioItemActive : ''
            } ${styles.aiRadioItem} `}
          >
            {/* <img src={item.img} alt="" /> */}
            <div className={styles.aiRadioItemText}>
              <div style={{fontSize: 14}}>{item.title}</div>
              <div>{item.des}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
