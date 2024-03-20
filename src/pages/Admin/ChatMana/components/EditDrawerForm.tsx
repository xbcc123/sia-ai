import services from '@/services/admin';
import {
  DrawerForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import {useChatModelList} from '@/hooks/chatModel';
import { usePlatformList } from '@/hooks/platform';

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
  const chatModelList = useChatModelList()
  const platformList = usePlatformList()

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        let info = { ...detail };
        info.isValid = detail.isValid === 1;
		info.model = info.model.split(',')
        form.setFieldsValue(info);
      } else {
        form.setFieldsValue({
			platform: 'OpenAI',
			isValid: false,
			model: 'gpt-3.5-turbo'
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
        let params: any = { ...values };
        params.isValid = params.isValid ? 1 : 0;
		params.model = params.model?.join?.(',')
        try {
          if (isEdit) {
            params.id = detail?.id;
            await services.ChatController.accountEdit(params);
          } else {
            await services.ChatController.accountCreate(params);
          }
          onOk();
          message.success('提交成功');
          onClose();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText label="名称" name={'name'} rules={[{ required: true }]} />
      <ProFormText tooltip={{
		title: <div style={{fontSize: 12}}>
		<div>文心一言格式: ApiKey-SecretKey</div>
		<div>讯飞星火格式: AppId-ApiKey-ApiSecret</div>
		<div>其他类型: 直接填写KEY值</div>
	  </div>
	  }} label="KEY值" name={'key'} rules={[{ required: true }]} />
	
      <ProFormRadio.Group
        name="platform"
        label="平台"
        options={platformList}
      />
      <ProFormCheckbox.Group
        name="model"
        label="模型集"
		options={chatModelList}
      />
      <ProFormSwitch
        name={'isValid'}
        rules={[{ required: true }]}
        label="可用性"
      ></ProFormSwitch>
    </DrawerForm>
  );
};

// const formItemDes = {
//   marginLeft: '4px',
//   fontSize: '10px',
//   color: '#999',
// };
