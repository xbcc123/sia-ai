import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, InputNumber, Select, Slider, Switch, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';
import { AiRadio } from './AiRadio';
import { DimensionRadio } from './DimensionRadio';
import { ReferenceDrawings } from './ReferenceDrawings';

const useStyles = createStyles(({ token }, props: any) => {
  return {
    title: {
      marginTop: '8px',
      marginBottom: '8px',
    },
  };
});

export const Forms = () => {
  const { styles } = useStyles();
  const [vOption, setVOption] = useState([
    {
      label: '5.2',
      value: '5.2',
    },
    {
      label: '5.1',
      value: '5.1',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '4',
      value: '4',
    },
  ]);
  return (
    <>
      <div className={styles.title}>AI模型</div>
      <Form.Item noStyle name="model">
        <AiRadio></AiRadio>
      </Form.Item>
      <div className={styles.title}>尺寸</div>
      <Form.Item noStyle name="ar">
        <DimensionRadio></DimensionRadio>
      </Form.Item>
      <div className={styles.title}>
        参考图{' '}
      </div>
      <Form.Item noStyle name="images">
        <ReferenceDrawings></ReferenceDrawings>
      </Form.Item>
      <div className={styles.title}>
        参考图权重{' '}
      </div>
      <Form.Item noStyle name="iw">
        <InputNumber
          min={0}
          max={2}
          step={0.1}
          style={{ width: '100%' }}
        ></InputNumber>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) =>
          prevValues.model !== curValues.model
        }
      >
        {({ getFieldValue }) => {
          return (
            getFieldValue('model') === 'mj' && (
              <>
                <div className={styles.title}>版本</div>
                <Form.Item noStyle name="v">
                  <Select options={vOption} style={{ width: '100%' }} />
                </Form.Item>
              </>
            )
          );
        }}
      </Form.Item>
      <div className={styles.title}>
	  	混乱值{' '}
        <Tooltip
          title={
            <>
              <div>较高值将产生更多不寻常和意想不到的结果和组合。较低值具有更可靠、可重复的结果</div>
            </>
          }
        >
          <ExclamationCircleOutlined />
        </Tooltip>
      </div>
      <Form.Item noStyle name="chaos">
        <Slider min={0} max={100} />
      </Form.Item>
      <div className={styles.title}>
        风格化程度{' '}
        <Tooltip
          title={
            <>
              <div>低风格化值生成的图像与提示非常匹配，但艺术性较差。高风格化值创建的图像非常具有艺术性，但与提示的联系较少</div>
            </>
          }
        >
          <ExclamationCircleOutlined />
        </Tooltip>
      </div>
      <Form.Item noStyle name="s">
        <Slider min={0} max={1000} />
      </Form.Item>
      <div className={styles.title}>画质</div>
      <Form.Item noStyle name="q">
        <Select
          style={{ width: '100%', marginBottom: 8 }}
          options={[
            {
              label: '普通',
              value: '.25',
            },
            {
              label: '清晰',
              value: '.5',
            },
            {
              label: '高清',
              value: '1',
            },
            {
              label: '超清',
              value: '2',
            },
          ]}
        />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <div>
          纹理平铺{' '}
          <Tooltip
            title={
              <>
                <div>可用作重复无缝拼贴的图像，以创建织物、壁纸和纹理的无缝图案</div>
              </>
            }
          >
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
        <div>
          <Form.Item noStyle valuePropName="checked" name="tile">
            <Switch size="small"></Switch>
          </Form.Item>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <div>
          公共绘画{' '}
          <Tooltip
            title={
              <>
                <div>绘画生成结果，将会在画廊中展示</div>
              </>
            }
          >
            <ExclamationCircleOutlined />
          </Tooltip>
        </div>
        <div>
          <Form.Item noStyle valuePropName="checked" name="isPublic">
            <Switch size="small"></Switch>
          </Form.Item>
        </div>
      </div>
    </>
  );
};
