import { Tip } from '@/components/Tip';
import { addBase64Prefix } from '@/utils';
import { uploadButton, uploadSingleBase64Props } from '@/utils/upload';
import { ProForm } from '@ant-design/pro-components';
import { Form, Image, Select, Typography, Upload } from 'antd';
import { useState } from 'react';
import { finishFnMap, toolsMap } from '..';
import { ImgFormItem } from './FormItem';

export const SingleImg = ({ info }: { info: any }) => {
  const [result, setResult] = useState<{ baseImg: string; img: string }>({
    baseImg: '',
    img: '',
  });
  const [form] = Form.useForm();

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          try {
            const data = await finishFnMap[toolsMap[info?.id]?.finish](values, info);
            setResult({
              baseImg: form.getFieldValue('imageBase64'),
              img: addBase64Prefix(data, 'image/png'),
            });
          } catch (error) {}
        }}
      >
        <Tip title={info?.title} des={info?.remark}></Tip>
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
