import { SubText } from '@/components/Text/index';
import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
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
      let data = await services.SiteDrawController.proxyInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteDrawController.proxyEdit(info);
            message.success('修改成功');
          } catch (error) {}
        }}
      >
        <ProFormText
          name="discordWssProxy"
          label={
            <>
              Discord 反向代理地址
              <SubText>默认为{baseInfo?.discordApi}</SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormText
          name="discordApiProxy"
          label={
            <>
              Discord WSS 反向代理地址
              <SubText>默认为{baseInfo?.discordWss}</SubText>
            </>
          }
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
