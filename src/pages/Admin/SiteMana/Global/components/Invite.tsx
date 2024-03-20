import {
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Form, Typography, Divider, message} from 'antd';
import {SubText} from '@/components/Text';
import { CodeText } from '@/components/Text/CodeText';
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
      let data = await services.SiteGlobalController.inviteInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <ProForm form={form} onFinish={async (values) => {
		    let info = { ...values };
			try {
			  await services.SiteGlobalController.inviteEdit(info);
			  message.success('修改成功, 刷新页面后生效');
			} catch (error) {}
	  }}>
		<Divider plain><Typography.Title level={5} >新人注册奖励</Typography.Title></Divider>
		<ProFormSwitch name="hasNewUser"   label={
            <>
              开启{' '}
              {/* <SubText>
				启用之后注册的用户将会获得套餐奖励
              </SubText> */}
            </>
          }  />
        <ProFormDigit name="nintegral" label="新人注册奖励积分" />
        <ProFormDigit name="nexpireDay" label="新人注册奖励积分有效天数" />

		<Divider plain><Typography.Title level={5} >邀请奖励</Typography.Title></Divider>
		<ProFormSwitch name="hasInviteUser" label={
            <>
             开启{' '}
              {/* <SubText>
				启用之后邀请用户将会获得套餐奖励
              </SubText> */}
            </>
          }  />
		<ProFormDigit name="iintegral" label="邀请好友奖励积分" />
        <ProFormDigit name="iexpireDay" label="邀请好友奖励积分有效天数" />
		{/* <ProFormSwitch name="checkBrush" label={
            <>
              邀请好友防刷检测{' '}
              <SubText>
				开启之后，如果邀请人和被邀请人最近处于同一网络则不会发送邀请奖励
              </SubText>
            </>
          }  /> */}
        <ProFormTextArea
          name="template"
		  label={
            <>
              邀请说明模板{' '}
              <SubText>
				自定义后将会替换掉系统内置模板，支持HTML，变量列表：<CodeText>code</CodeText>: 邀请码,<CodeText>url</CodeText>：邀请链接，<CodeText>integral</CodeText>: 奖励积分，<CodeText>day</CodeText>: 积分有效期
              </SubText>
            </>
          }
          placeholder="请输入"
        />

      </ProForm>
    </div>
  );
};
