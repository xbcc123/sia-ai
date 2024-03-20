import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Divider, Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();

  const [baseInfo, setBaseInfo] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.toolInfo();
      setImageUrl(data.wxQrcode || '');
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
          if (imageUrl) {
            info.wxQrcode = imageUrl;
          }
          try {
            await services.SiteGlobalController.toolEdit(info);
            message.success('修改成功, 刷新页面后生效');
          } catch (error) {}
        }}
      >
        <Divider style={{ marginTop: 8, marginBottom: 0 }}>
          火山引擎API访问凭证
        </Divider>
        <ProFormText name="key" label="Access Key ID" />
        <ProFormText name="secret" label="Secret Access Key"/>
      </ProForm>
    </div>
  );
};
