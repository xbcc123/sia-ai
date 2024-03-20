import { ProForm,  ProFormTextArea } from '@ant-design/pro-components';
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
      let data = await services.SiteGlobalController.promptInfo();
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
		  await services.SiteGlobalController.promptEdit(info);
		  message.success('修改成功, 刷新页面后生效');
		} catch (error) {}
	  }}>
        <ProFormTextArea
          name="quoteTip"
		  label={
            <>
              余额不足提示{' '}
              {/* <SubText>
				自定义后将会替换掉系统内置模板
              </SubText> */}
            </>
          }
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
