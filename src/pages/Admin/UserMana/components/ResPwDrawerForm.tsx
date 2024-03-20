import services from '@/services/admin';
import {
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';

export const ResPwDrawerForm = ({
  visible,
  detail,
  onClose,
  onOk,
}: {
  visible: boolean;
  detail: any;
  onClose: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();

  return (
    <DrawerForm
      title="重置密码"
      layout="horizontal"
      open={visible}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          onClose();
        },
      }}
      onFinish={async (values) => {
        let params: any = { ...values };
        try {
          params.userId = detail?.userId;
          await services.UserController.passwordReset(params);
          message.success('提交成功');
          onOk();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText.Password
        label="新密码"
        name={'password'}
        rules={[{ required: true }]}
      />
    </DrawerForm>
  );
};
