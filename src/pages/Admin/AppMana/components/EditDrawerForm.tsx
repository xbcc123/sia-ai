import services from '@/services/admin';
import {DrawerForm, ProFormDigit, ProFormSlider, ProFormSwitch, ProFormText, ProFormTextArea, ProFormSelect} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect } from 'react';
import {useClassList} from '@/hooks/class';
import {useModel} from '@umijs/max';

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
  const { modeList} = useModel('modes');

  const classList = useClassList()

  useEffect(() => {
    if (visible) {
      if (isEdit) {
		let info = {...detail}
		info.isPublic = detail.isPublic === 1
        form.setFieldsValue(info);
      } else {
        form.setFieldsValue({
			isPublic: false,
			temperature: 0,
			presencePenalty: 0,
			frequencyPenalty: 0,
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
		let params: any = {...values}
		params.isPublic = params.isPublic ? 1: 0
        try {
          if (isEdit) {
			params.id = detail?.id
            await services.AppController.appEdit(params);
          } else {
            await services.AppController.appCreate(params);
          }
          message.success('提交成功');
          onOk();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText label="名称" name={'name'} rules={[{ required: true }]} />
      <ProFormTextArea
        label="应用设定"
        name={'prompt'}
        rules={[{ required: true }]}
      />
	  <ProFormSelect
        request={async () => modeList}
        name="model"
        label="模型"
		rules={[{ required: true }]}
        fieldProps={{
          style: {
            width: 200,
          },
        }}
      />
		<ProFormSelect
        request={async () => classList}
        name="categoryId"
        label="分类"
        rules={[{ required: true }]}
        fieldProps={{
          style: {
            width: 200,
          },
        }}
      />
      <ProFormText label={
          <>
            图标
            <div style={formItemDes}>支持Emoji，fontawesome</div>
          </>
        } name={'icon'} rules={[{ required: true }]} />
      <ProFormTextArea
        label="描述"
        name={'description'}
        rules={[{ required: true }]}
      />
      <ProFormText
        label="输入占位"
        name={'placeholder'}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="排序"
        name={'sort'}
        min={0}
        max={1000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
      <ProFormText
        label="提交按钮名称"
        name={'submitTitle'}
        rules={[{ required: true }]}
      />
      <ProFormDigit
        label="最大输入长度"
        name={'maxLength'}
        min={0}
        max={8000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
      <ProFormSlider
        name="temperature"
        label={
          <>
            随机性
            <div style={formItemDes}>值越大，回复的内容越随机</div>
          </>
        }
        min={0}
        max={1}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择随机性',
          },
        ]}
        fieldProps={{}}
      />

      <ProFormSlider
        name="presencePenalty"
        label={
          <>
            话题新鲜度
            <div style={formItemDes}>值越大，扩展到新话题的可能性越大</div>
          </>
        }
        min={-2}
        max={2}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择话题新鲜度',
          },
        ]}
        fieldProps={{}}
      />

      <ProFormSlider
        name="frequencyPenalty"
        label={
          <>
            重复度
            <div style={formItemDes}>
              值越大，回复重复单词或短语的可能性越小
            </div>
          </>
        }
        min={-2}
        max={2}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择重复度',
          },
        ]}
        fieldProps={{}}
      />

	<ProFormSwitch name="isPublic" label="是否公开" />
    </DrawerForm>
  );
};

const formItemDes = {
  marginLeft: '4px',
  fontSize: '10px',
  color: '#999',
};
