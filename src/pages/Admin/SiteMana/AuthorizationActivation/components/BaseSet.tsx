import { ProForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Form } from 'antd';

export default () => {
  const [form] = Form.useForm();
  
  return (
    <div>
      <ProForm form={form} onFinish={async() => {
		
	  }}>
        <ProFormTextArea
          name="text"
          label="用户协议"
		  fieldProps={{
			rows: 10
		  }}
          placeholder="请输入"
        />
		<ProFormTextArea
          name="text"
          label="隐私协议"
		  fieldProps={{
			rows: 10
		  }}
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
