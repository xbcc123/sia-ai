import services from '@/services/admin';
import {
  DrawerForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import {usePlanClass} from '../../hooks/planClass';

export const EditDrawerForm = ({
  isEdit,
  visible,
  detail,
  onClose,
  onOk
}: {
  isEdit: boolean;
  visible: boolean;
  detail: any;
  onClose: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();
  const { planClass } = usePlanClass()

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        let info = { ...detail };
        info.isPublic = detail.isPublic === 1;
        info.eachDay = detail.eachDay === 1;
        form.setFieldsValue(info);
      } else {
		form.setFieldsValue({
			isPublic: false,
			eachDay: true
		});
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
	  initialValues={{
		discount: 1
	  }}
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          onClose();
        },
      }}
      onFinish={async (values) => {
        let params: any = { ...values };
        params.isPublic = params.isPublic ? 1 : 0;
        params.eachDay = params.eachDay ? 1 : 0;
        try {
		  if(isEdit) {
			params.id = detail?.id;
			await services.PlanController.edit(params);
		  }else {
			await services.PlanController.create(params);
			}
			onOk()
          message.success('提交成功');
          onClose();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText
        label="名称"
        name={'name'}
        rules={[{ required: true }]}
      />
      <ProFormTextArea
        label="描述"
        name={'description'}
        rules={[{ required: true }]}
      />
	  <ProFormSelect
        label="分类"
        name={'category'}
		options={planClass}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="价格（分）"
        name={'price'}
		min={0} max={10000} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="有效天数"
        name={'expireDay'}
		min={0} max={10000} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="积分数量"
        name={'integral'}
		min={0} max={100000} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormSwitch
        name={'eachDay'}
        rules={[{ required: true }]}
        label="每日重置"
      ></ProFormSwitch>
      <ProFormDigit
        label="排序值"
        name={'sort'}
		min={0} max={100000} fieldProps={{ precision: 0 }}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="折扣比例"
        name={'discount'}
		min={0.01} max={1} fieldProps={{ precision: 2 }}
        rules={[{ required: true }]}
      />
      <ProFormSwitch
        name={'isPublic'}
        rules={[{ required: true }]}
        label="启用"
      ></ProFormSwitch>
    </DrawerForm>
  );
};

// const formItemDes = {
//   marginLeft: '4px',
//   fontSize: '10px',
//   color: '#999',
// };
