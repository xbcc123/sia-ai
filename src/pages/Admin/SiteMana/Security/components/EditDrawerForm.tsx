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
		if(isEdit) {
			try {
				params.id = detail?.id;
				await services.SiteSecurityController.sensitiveWordEdit(params);
				message.success('提交成功');
				onOk();
			  } catch (error) {}
		}else {
			try {
				await services.SiteSecurityController.sensitiveWordCreate(params);
				message.success('提交成功');
				onOk();
			  } catch (error) {}
		}
        return true;
      }}
    >
      <ProFormText
        label="敏感词"
        name={'keyword'}
        rules={[{ required: true }]}
      />
    </DrawerForm>
  );
};
