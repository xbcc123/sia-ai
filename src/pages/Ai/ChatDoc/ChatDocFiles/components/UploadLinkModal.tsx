import services from '@/services/ai';
import {
  ModalForm,
  ProFormSwitch,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, Typography } from 'antd';
import {useEffect, useRef} from 'react';

export const UploadLinkModal = ({
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

  useEffect(() => {
	urlParams.current = new URLSearchParams(location.search);
    if (open) {
		form.resetFields()
    }
  }, [open]);

  return (
    <ModalForm<{
		urlStr: string
		refresh: boolean
	}>
      title="把在线网页URL添加到知识库"
      form={form}
      open={open}
      layout="horizontal"
      autoFocusFirstInput
      initialValues={{
        urlStr: 'http://',
      }}
      modalProps={{
        onCancel,
        okText: '上传',
        cancelButtonProps: {
          style: {
            display: 'none',
          },
        },
      }}
      onFinish={async (values) => {
		const { urlStr, refresh } = values
		const urls = getUrlsFromStr(urlStr || "") || []
        let params = {
			libraryId: Number(urlParams.current.get('id')),
			urls,
			refresh
		}
        try {
          await services.ChatDocController.documentCreateByUrl(params);
          onOk();
        } catch (error) {}
        return true;
      }}
    >
      <Form.Item>
        <ProFormTextArea
          noStyle
          fieldProps={{
            rows: 8,
          }}
          name={'urlStr'}
          placeholder={'提交到知识库的网页链接，每行一个，无效链接会自动剔除'}
        ></ProFormTextArea>
        <Typography.Text style={{ fontSize: 12, color: '#888' }}>
          任何反爬、js内容均不支持，请合理使用该功能
        </Typography.Text>
      </Form.Item>
      <ProFormSwitch name={"refresh"} label="如果URL已经存在则强制刷新"></ProFormSwitch>
    </ModalForm>
  );
};

// const text =
//   'http://baidu.com. \nhttp://baidu.com \nhttp://baidu.com\nhttp://baidu.com';

const getUrlsFromStr = (text: string) => {
  // 使用正则表达式匹配URL
  const urlRegex = /(https?:\/\/[^\s/$.?#].[^\s]*)/g;
  const urls: any = text.match(urlRegex);
  return urls
};
