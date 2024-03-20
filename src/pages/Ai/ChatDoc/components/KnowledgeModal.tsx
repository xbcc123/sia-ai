import services from '@/services/ai';
import {
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect } from 'react';

interface AppConfig {
  defaultApiKey: string;
  description: string;
  libraryName: string;
  promptTemplate: string;
  similarityTopK: number;
}

export const KnowledgeModal = ({
  open = false,
  info,
  isEdit,
  onCancel,
  onOk,
}: {
  open: boolean;
  info: any;
  isEdit: boolean
  onCancel: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
		if(isEdit) {
			form.setFieldsValue(info);
		}
    } 
  }, [open]);

  return (
    <ModalForm<AppConfig>
      title=""
      form={form}
      open={open}
      width={600}
      autoFocusFirstInput
	  initialValues={{
		promptTemplate: "你是一位有耐心、友好、逻辑清晰的文档分析专家，接下来我会给你一些文档内容，用于回答用户输入的问题。\n回答要求：\n1. 请使用总分总写作结构生成答案\n2. 如果给定的文档内容无法直接回答用户输入的问题，请尝试一步一步分析得出答案\n3. 请不要在答案中包含流程描述\n4. 始终使用序号[1]来标注答案引用于哪份文档\n5. 使用Markdown格式回答\n以下是文档内容：\n${content}\n\n问题：${question}\n答案："
	  }}
      modalProps={{
        onCancel: () => {
			form.resetFields()
			onCancel?.()
		},
      }}
      onFinish={async (values) => {
        let params = {
          ...values,
          ...{
            defaultApiKey: JSON.parse(localStorage.getItem('userInfo') || '{}')
              ?.apiKey,
          },
        };
        try {
          await services.ChatDocController.libraryCreate(params);
		  form.resetFields()
		  onOk();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText
        label="名称"
        name="libraryName"
        rules={[{ required: true }]}
        tooltip="起一个响亮的名字"
      ></ProFormText>
      <ProFormText
        label="描述"
        name="description"
        rules={[{ required: true }]}
        tooltip="介绍一下这个知识库吧"
      ></ProFormText>
      <ProFormDigit
        tooltip="最终问答使用与输入信息匹配的相似文档片段数，越多回答越准，消耗的tokens也更多"
        label="信息匹配数量"
        name={'similarityTopK'}
        min={0}
        max={8000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
      <ProFormTextArea
        name={'promptTemplate'}
        rules={[{ required: true }]}
        tooltip="对文档片段进行语义搜索后，最终由大模型做出回答总结的提示词。${content}占位符表示内容片段，${question}表示用户输入的提问
"
        label="回答总结提示词"
		fieldProps={{
			rows: 8
		}}
      ></ProFormTextArea>
      {/* <ProFormText rules={[{ required: true }]} label="默认使用的API密钥"></ProFormText> */}
    </ModalForm>
  );
};
