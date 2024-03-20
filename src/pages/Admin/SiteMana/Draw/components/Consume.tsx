import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import { ProForm, ProFormDigit } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteDrawController.consumeInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  const digitProps = {
    min: 0,
    max: 1000,
    fieldProps: {
      precision: 0,
    },
  };

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteDrawController.consumeEdit(info);
            message.success('修改成功');
          } catch (error) {}
        }}
      >
        {/* <Tip title={'提示'} des={'下面配置为0则不扣除积分'}></Tip> */}
        <ProFormDigit
          name="imagineIntegral"
          label="Midjourney 文生图：IMAGINE 单次扣除积分"
          {...digitProps}
        />
        <ProFormDigit
          name="upscaleIntegral"
          label="Midjourney 放大：UPSCALE 单次扣除积分"
        />
        <ProFormDigit
          name="variateIntegral"
          label="Midjourney 变幻：VARIATE 单次扣除积分"
          {...digitProps}
        />
        <ProFormDigit
          name="resetIntegral"
          label="Midjourney 重置：RESET 单次扣除积分"
          {...digitProps}
        />
        <ProFormDigit
          name="blendIntegral"
          label="Midjourney 混图：BLEND 单次扣除积分"
          {...digitProps}
        />
        <ProFormDigit
          name="panIntegral"
          label="Midjourney 移动：PAN 单次扣除积分"
          {...digitProps}
        />
        <ProFormDigit
          name="zoomIntegral"
          label="Midjourney 扩图：ZOOM 单次扣除积分"
        />
        <ProFormDigit
          name="describeIntegral"
          label="Midjourney 咒语解析：DESCRIBE 单次扣除积分"
          {...digitProps}
        />
      </ProForm>
    </div>
  );
};
