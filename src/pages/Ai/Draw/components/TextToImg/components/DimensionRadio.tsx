import { ModalForm, ProFormDigitRange } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import { createStyles } from 'antd-style';
import { useEffect, useState } from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    dimensionRadio: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    dimensionRadioItem: {
      padding: '2px 8px',
      width: '30%',
      textAlign: 'center',
      cursor: 'pointer',
      borderColor: token.colorBorder,
      borderStyle: 'solid',
      fontSize: '12px',
      borderRadius:  token.borderRadius,
      '&:hover': { borderColor: token.colorPrimary, background: token.colorBgBase },
      '&.dimensionRadioItemActive': {  },
    },
    dimensionRadioItemActive: {
		borderColor: token.colorPrimary, 
		background: token.colorBgBase
	},
  };
});

export const DimensionRadio = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) => {
  const { styles } = useStyles();
  const [visible, setVisible] = useState(false)
  const [dimensionRadioList, setDimensionRadioList] = useState([
    {
      title: '1:1',
      des: '头像',
      value: '1:1',
    },
    {
      title: '3:2',
      des: '文章配图',
      value: '3:2',
    },
    {
      title: '4:3',
      des: '公众号配图',
      value: '4:3',
    },
    {
      title: '9:16',
      des: '海报图',
      value: '9:16',
    },
    {
      title: '16:9',
      des: '电脑壁纸',
      value: '16:9',
    },
	{
		title: '0:0',
		des: '自定义',
		value: '0:0',
	  },
  ]);
  const [radioIndex, setRadioIndex] = useState(0);
  const [form] = Form.useForm()

  useEffect(() => {
    if (value !== undefined) {
      setRadioIndex(
        dimensionRadioList.findIndex((item) => item.value === value),
      );
    }
  }, [value]);

  return (<>
    <div className={styles.dimensionRadio}>
      {dimensionRadioList?.map?.((item, index) => {
        return (
          <div
		  key={index}
		  onClick={() => {
			setRadioIndex(index)
			onChange?.(dimensionRadioList[index].value)
			if(item.des === '自定义') {
				setVisible(true)
			}
		  }}
            className={`${styles.dimensionRadioItem} ${radioIndex === index ? styles.dimensionRadioItemActive: ''}`}
          >
            <div>{item.title}</div>
            <div>{item.des}</div>
          </div>
        );
      })}
    </div>

	  <ModalForm<{
		inputRange: number[];
    }>
      title="自定义尺寸"
	  open={visible}
      form={form}
	  width={300}
      autoFocusFirstInput
      modalProps={{
        onCancel: () => setVisible(false)
      }}
      onFinish={async (values) => {
		const { inputRange } = values
		dimensionRadioList.forEach((item, index) => {
			if(item.des === '自定义') {
				item.title = `${inputRange[0]}:${inputRange[1]}`
				item.value = `${inputRange[0]}:${inputRange[1]}`
				onChange?.(dimensionRadioList[index].value)
			}
		})
		setDimensionRadioList([...dimensionRadioList])
		setVisible(false)
      }}>
		<ProFormDigitRange rules={[{required: true}]} name="inputRange" />
	  </ModalForm>
	</>
  );
};
