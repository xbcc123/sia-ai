import { SubText } from '@/components/Text';
import services from '@/services/admin';
import { ProForm, ProFormTextArea } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});
  const [value, setValue] = useState('');

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.notifylInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue({
		popTip: info.popTip,
		content: BraftEditor.createEditorState(info.popTip)
	  });
	  
    } catch (error) {}
  };
  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteGlobalController.notifyEdit(info);
            message.success('修改成功, 刷新页面后生效');
          } catch (error) {}
        }}
      >
        <ProFormTextArea
          name="popTip"
		  fieldProps={{
			rows: 10
		  }}
          label={
            <>
              用户页弹窗公告 <SubText>支持HTML</SubText>
            </>
          }
          placeholder="请输入"
        />
		 {/* <Form.Item name={'content'} label="文章正文">
              <BraftEditor
                className="my-editor"
                placeholder="请输入正文内容"
              />
          </Form.Item> */}
      </ProForm>
    </div>
  );
};
