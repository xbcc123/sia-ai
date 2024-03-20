import { ATag } from '@/components/Tag/ATag';
import { Tip } from '@/components/Tip';
import { ProForm } from '@ant-design/pro-components';
import {Form, Select, Typography, message, Image} from 'antd';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { finishFnMap, toolsMap } from '..';
import { ImgFormItem } from './FormItem';
import {addBase64Prefix} from '@/utils';
import { SubText } from '@/components/Text';

export const ImgChangeStyle = ({ info }: { info: any }) => {
	const [result, setResult] = useState<{ baseImg: string; img: string }>({
		baseImg: '',
		img: '',
	  });  const [form] = Form.useForm();

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          try {
            const data = await finishFnMap[toolsMap[info?.id]?.finish](
              values,
              info,
            );
			setResult({
				baseImg: form.getFieldValue('imageBase64'),
				img: addBase64Prefix(data, 'image/png'),
			  });
          } catch (error) {}
        }}
      >
        <Tip title={info?.title} des={info?.remark}></Tip>{' '}
        <Form.Item name="type" label={<>风格 <SubText>仅支持人像风格</SubText> </>}>
          <Select
		   style={{
			width: 200
		   }}
		    placeholder="请选择风格"
            options={[
              {
                label: '剪纸风',
                value: 'jzcartoon',
              },
              {
                label: '水彩风',
                value: 'watercolor_cartoon',
              },
            ]}
          ></Select>
        </Form.Item>
        <ImgFormItem></ImgFormItem>
      </ProForm>
	  {result?.img && (
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            生成结果
          </Typography.Title>
          <Image width={200} src={result?.img} />
        </div>
      )}
    </div>
  );
};
