import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import services from '@/services/admin';
import {SubText} from '@/components/Text';
import {useEffect, useState} from 'react';

export default () => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    getPresetInfo();
  }, []);

  const getPresetInfo = async () => {
    try {
      let data = await services.SiteChatController.presetInfo();
	  form.setFieldsValue(data)
    } catch (error) {}
  };

  return (
    <div>
      <ProForm form={form} onFinish={async(values) => {
		try {
			const data = await services.SiteChatController.presetEdit(values)
			message.success('修改成功')
		} catch (error) {
			
		}
	  }}>
        <ProFormTextArea
          name="titlePrompt"
          placeholder="请输入"
		  label={
            <>
              对话标题总结预设 <SubText>主要用于根据对话内容自己总结标题</SubText>
            </>
          }
        />
        <ProFormTextArea
          name="translatePrompt"
          placeholder="请输入"
		  label={
            <>
              全局自动翻译预设 <SubText>主要用户会话描述自动翻译</SubText>
            </>
          }
        />
      </ProForm>
    </div>
  );
};
