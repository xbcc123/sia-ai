import { ProForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import {Form, message} from 'antd';
import {SubText} from '@/components/Text';
import services from '@/services/admin';
import {useEffect, useState} from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteProtocolController.commonInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <ProForm form={form} onFinish={async(values) => {
		   let info = { ...values };
		   try {
			 await services.SiteProtocolController.commonEdit(info);
			 message.success('修改成功');
		   } catch (error) {}
	  }}>
        <ProFormTextArea
          name="user"
          placeholder="请输入"
		  fieldProps={{
			rows: 8
		  }}
		  label={
            <>
              用户协议 <SubText>支持HTML</SubText>
            </>
          }
        />
		<ProFormTextArea
          name="privacy"
          placeholder="请输入"
		  fieldProps={{
			rows: 8
		  }}
		  label={
            <>
              隐私协议 <SubText>支持HTML</SubText>
            </>
          }
        />
      </ProForm>
    </div>
  );
};
