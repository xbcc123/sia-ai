import services from '@/services/ai';
import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';

export const UploadDocModal = ({
  open = false,
  onCancel,
  onOk,
}: {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();
  const urlParams = useRef<any>();
  const [confirmLoading, setConfirmLoading] = useState(false)

  useEffect(() => {
    urlParams.current = new URLSearchParams(location.search);
    if (open) {
		form.resetFields()
    }
  }, [open]);

  const customRequest = async (option: any) => {
    const file = option.file as File;
    try {
      // 使用第三方服务进行文件上传
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   formData.append('libraryId', urlParams.current.get('id'));
      //   const result = await services.ChatDocController.documentCreateByTextUpload(
      //     formData,
      //   );
      // onSuccess的回调参数可以在 UploadFile.response 中获取
      option.onSuccess(file);
    } catch (error) {
      option.onError(error);
    }
  };

  return (
    <ModalForm<{
      dragger: any[];
    }>
      title="上传文件"
      form={form}
      open={open}
      width={400}
      autoFocusFirstInput
      modalProps={{
		confirmLoading,
        onCancel,
        okText: '上传',
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
      onFinish={async (values) => {
        const draggerList = values?.dragger || [];
		const filePromiseList = []
		setConfirmLoading(true)
        for (let index = 0; index < draggerList?.length || 0; index++) {
          const file = draggerList[index];
          const formData = new FormData();
		  console.log(file);
          formData.append('file', file?.response);
          formData.append('libraryId', urlParams.current.get('id'));
		  filePromiseList.push(services.ChatDocController.documentCreateByTextUpload(
			formData,
		  )) 
        }
		try {
			await Promise.all(filePromiseList)
			onOk();	
			setConfirmLoading(false)
		} catch (error) {
			setConfirmLoading(false)
		}
        return true;
      }}
    >
      <ProFormUploadDragger
        max={4}
        label=""
        name="dragger"
        fieldProps={{
          accept: '.txt, .md, .markdown, .doc, .docx, .pdf',
          customRequest,
        }}
      >
        .txt .md .markdown .doc .docx .pdf
      </ProFormUploadDragger>
    </ModalForm>
  );
};
