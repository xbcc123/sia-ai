import { Tip } from '@/components/Tip';
import { ProForm } from '@ant-design/pro-components';
import { Form, Typography, message} from 'antd';
import { useState } from 'react';
import { finishFnMap, toolsMap } from '..';
import { ImgFormItem } from './FormItem';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ATag } from '@/components/Tag/ATag';

export const SingleImgToText = ({ info }: { info: any }) => {
  const [result, setResult] = useState<string[]>([]);
  const [form] = Form.useForm();

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          try {
            const data = await finishFnMap[toolsMap[info?.id]?.finish](values, info);
            setResult(data);
          } catch (error) {}
        }}
      >
        <Tip title={info?.title} des={info?.remark}></Tip>
		<ImgFormItem></ImgFormItem>
      </ProForm>
      {result?.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            生成结果
          </Typography.Title>
          {
			result?.map?.(item => {
				return <div><Typography.Text>{item}</Typography.Text></div> 
			})
		  }
		   <CopyToClipboard
              text={info?.prompt}
              onCopy={() => {
                message.success('复制成功');
              }}
            >
              <ATag pointer type="default" style={{ marginLeft: 8, marginTop: 16 }}>
                复制
              </ATag>
            </CopyToClipboard>
        </div>
      )}
    </div>
  );
};
