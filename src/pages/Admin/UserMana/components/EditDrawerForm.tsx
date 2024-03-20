import services from '@/services/admin';
import {
  DrawerForm,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect } from 'react';

export const EditDrawerForm = ({
  isEdit,
  visible,
  detail,
  onClose,
  onOk,
}: {
  isEdit: boolean;
  visible: boolean;
  detail: any;
  onClose: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        let info = { ...detail };
        info.isAdmin = detail.isAdmin === 1;
        form.setFieldsValue(info);
      }
    }
  }, [visible]);

  return (
    <DrawerForm
      title="编辑"
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
        params.isAdmin = params.isAdmin ? 1 : 0;
        try {
          params.userId = detail?.userId;
          await services.UserController.edit(params);
          message.success('提交成功');
          onOk();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText
        label="昵称"
        name={'nickName'}
        rules={[{ required: true }]}
      />
      <ProFormRadio.Group
        name="state"
        label="状态"
        rules={[{ required: true }]}
        options={[
          {
            label: '启用',
            value: 'NORMAL',
          },
          {
            label: '冻结',
            value: 'FREEZE',
          },
          {
            label: '注册中',
            value: 'SIGN_IN',
			disabled: true
          },
        ]}
      />
      <ProFormSwitch
        name={'isAdmin'}
        rules={[{ required: true }]}
        label="是否管理员"
      ></ProFormSwitch>
    </DrawerForm>
  );
};
