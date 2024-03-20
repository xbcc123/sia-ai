import { SubText } from '@/components/Text';
import services from '@/services/admin';
import {
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Divider, Form, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();

  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.emailInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(data);
    } catch (error) {}
  };

  const site = '{{site_name}}';
  const code = '{{code}}';
  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteGlobalController.emailEdit(info);
            message.success('修改成功, 刷新页面后生效');
          } catch (error) {}
        }}
      >
        <ProFormText
          name="server"
          placeholder="请输入"
          label={
            <>
              邮箱服务器
			  {/* <SubText>如163邮箱为：smtp.163.com</SubText> */}
            </>
          }
        />
        <ProFormDigit name="port" label="邮箱服务器端口" />
        <ProFormSwitch name="hasSSL" label="SSL协议" />
        <ProFormText name="userName" label="邮箱用户" placeholder="请输入" />
        <ProFormText
          name="password"
          label={
            <>
              邮箱密码{' '}
              <SubText>
                {/* 一版非邮箱账号直接密码，而是对应的平台的POP3/SMTP授权码 */}
				平台的POP3/SMTP授权码
              </SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormText
          name="nickName"
          label="邮箱用户名称"
          placeholder="请输入"
        />
        <ProFormSwitch name="openWhiteList" label={<>启用邮箱白名单 </>} />
        <ProFormTextArea
          name="whiteList"
          label={
            <>
              邮箱白名单{' '}
              <SubText>多个邮箱之间,进行分隔，例如qq.com,163.com</SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormTextArea
          name="loginTemplate"
          label={
            <>
              登录邮件模板{' '}
              <SubText>
                模板变量： {site}: 站点名称，{code}: 验证码
              </SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormTextArea
          name="bindTemplate"
          label={
            <>
              绑定邮件模板{' '}
              <SubText>
                模板变量： {site}: 站点名称，{code}: 验证码
              </SubText>
            </>
          }
          placeholder="请输入"
        />
			  <ProFormTextArea
          name="retrieveTemplate"
          label={
            <>
              找回密码邮件模板{' '}
              <SubText>
                模板变量： {site}: 站点名称，{code}: 验证码
              </SubText>
            </>
          }
          placeholder="请输入"
        />
		  <ProFormTextArea
          name="registerTemplate"
          label={
            <>
              找回密码邮件模板{' '}
              <SubText>
                模板变量： {site}: 站点名称，{code}: 验证码
              </SubText>
            </>
          }
          placeholder="请输入"
        />
        <Divider plain>
          <Typography.Title level={5}>阿里云短信配置</Typography.Title>
        </Divider>
        <ProFormText
          name="smsAccessKeyId"
          label="阿里云短信 AccessKeyId"
          placeholder="请输入"
        />
        <ProFormText
          name="smsAccessKeySecret"
          label="阿里云短信 AccessKeySecret"
          placeholder="请输入"
        />
        <ProFormText
          name="smsSignName"
          label="阿里云短信签名"
          placeholder="请输入"
        />
        <ProFormText
          name="smsRegTempCode"
          label="阿里云短信注册验证码模板CODE"
          placeholder="请输入"
        />
        <ProFormText
          name="smsLoginTempCode"
          label="阿里云短信登录验证码模板CODE"
          placeholder="请输入"
        />
		 <ProFormText
          name="smsBindTempCode"
          label="阿里云短信绑定验证码模板CODE"
          placeholder="请输入"
        />
        <ProFormText
          name="smsRetrieveTempCode"
          label="阿里云短信找回验证码模板CODE"
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
