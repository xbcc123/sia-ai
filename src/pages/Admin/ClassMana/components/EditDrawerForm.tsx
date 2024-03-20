import services from '@/services/admin';
import {
  DrawerForm,
  ProFormDigit,
  ProFormSlider,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import {SubText} from '../../../../components/Text/index';

export const EditDrawerForm = ({
  isEdit,
  visible,
  detail,
  onClose,
}: {
  isEdit: boolean;
  visible: boolean;
  detail: any;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        form.setFieldsValue(detail);
      } else {
        form.setFieldsValue({

		});
      }
    }
  }, [visible]);

  return (
    <DrawerForm
      title="编辑"
      layout="vertical"
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
		let params: any = {...values, group: 'APP'}
        try {
          if (isEdit) {
			params.id = detail?.id
            await services.ClassController.edit(params);
          } else {
            await services.ClassController.create(params);
          }
          message.success('提交成功');
          onClose();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText label="名称" name={'name'} rules={[{ required: true }]} />
      <ProFormText label="key" name={'key'} rules={[{ required: true }]} />
	  <ProFormText  label={
          <>
            图标
            <SubText>支持Emoji，fontawesome</SubText>
          </>
        }  name={'icon'} rules={[{ required: true }]} />
      <ProFormDigit
        label="排序"
        name={'sort'}
        min={0}
        max={1000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
    </DrawerForm>
  );
};

// const formItemDes = {
//   marginLeft: '4px',
//   fontSize: '10px',
//   color: '#999',
// };
