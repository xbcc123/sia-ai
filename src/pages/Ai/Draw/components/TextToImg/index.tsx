import { Consume } from '@/components/Consume';
import services from '@/services/ai';
import { useModel, useSnapshot} from '@umijs/max';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { CusParamsSwitch } from './components/CusParamsSwitch';
import { Forms } from './components/Forms';
import useStyles from './index.module.style';
import {SaveParamsSwitch} from './components/SaveParamsSwitch';
import {SenceTypeMode, changeSenceFlag, changeSence} from '@/valtioStore/drawMode';

const initialValues = {
	prompt: '',
	model: 'mj',
	ar: '1:1',
	images: [],
	v: 5.2,
	chaos: 0,
	s: 0,
	q: '1',
	iw: 2,
	tile: false,
	isPublic: false,
	cus: false,
	saveParams: false
}

export const TextToImg = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { modeDrawList } = useModel('modesDraw');
  const senceTypeMode = useSnapshot(SenceTypeMode);
  
// 通过场景变更数据
  useEffect(() => {
	if(senceTypeMode?.config?.drawTypeFlag) {
		form.setFieldsValue(senceTypeMode?.config?.config)
		changeSenceFlag(false)
	}
  }, [senceTypeMode?.config?.drawTypeFlag]);

  const getParams = ({
    prompt,
    model,
    cus,
    ar,
    chaos,
    s,
    q,
    tile,
    v,
	iw,
    images,
    isPublic,
  }: any) => {
    // "a white duck  --ar 3:2 --chaos 33 --s 300 --q 1 --tile --v 5.2"
    if (!cus) {
      prompt = `${prompt} --ar ${ar} --chaos ${chaos} --s ${s} --q ${q}`;
      if (model === 'niji') {
        prompt = `${prompt} --niji 5`;
      }
      if (tile) {
        prompt = `${prompt} --tile`;
      }
      if (v) {
        prompt = `${prompt} --v ${v}`;
      }
	  if (iw) {
        prompt = `${prompt} --iw ${iw}`;
      }
    }
    return {
      action: 'IMAGINE',
      prompt,
      imageList: images,
      isPublic: isPublic ? 1 : 0,
    };
  };

  return (
    <Form
      form={form}
	  style={{width: '100%'}}
      initialValues={initialValues}
      onFinish={async (values) => {
        try {
          setLoading(true);
          const data = await services.DrawController.taskSubmit(
            getParams(values),
          );
          setLoading(false);
		  if(!values?.saveParams) {
			form.setFieldsValue(initialValues);
		  }
          onSubmit(data);
        } catch (error) {
          setLoading(false);
        }
      }}
    >
      <div className={styles.contanir}>
        <div className={styles.content}>
          <SaveParamsSwitch></SaveParamsSwitch>
          <CusParamsSwitch></CusParamsSwitch>
          <div className={styles.title}>图像描述</div>
          <Form.Item noStyle name="prompt">
            <Input.TextArea
              rows={3}
              showCount
			  allowClear
              placeholder="写下你的图像创意"
            ></Input.TextArea>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, curValues) =>
              prevValues.cus !== curValues.cus
            }
          >
            {({getFieldValue}) => {
              return !getFieldValue('cus') && <Forms></Forms>;
            }}
          </Form.Item>
        </div>

        <div className={styles.bottom}>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              return (
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  disabled={!getFieldValue('prompt')}
                >
                  生成绘图{' '}
                  <Consume
                    cost={
                      modeDrawList?.find((item) => item.value === 'IMAGINE')
                        ?.cost
                    }
                  ></Consume>
                </Button>
              );
            }}
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};
