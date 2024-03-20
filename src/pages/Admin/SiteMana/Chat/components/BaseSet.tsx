import {ProForm, ProFormDigit, ProFormSwitch, ProFormText, ProFormTextArea, ProFormSelect} from '@ant-design/pro-components';
import {Form, message} from 'antd';
import {SubText} from '@/components/Text';
import {useEffect, useState} from 'react';
import services from '@/services/admin';
import {useModel} from '@umijs/max';

export default () => {
  const [form] = Form.useForm();
  const { modeList } = useModel('modes');

  const [baseInfo, setBaseInfo] = useState<any>({})
  
  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteChatController.baseInfo();
	  setBaseInfo(data)
	  let info = {...data}
	  info.autoCheck = info.autoCheck === 1  
	  info.autoTitle = info.autoTitle === 1 
	  form.setFieldsValue(data)
    } catch (error) {}
  };

  return (
    <div>
      <ProForm form={form} onFinish={async(values) => {
		let info = {...values}
		info.autoCheck = info.autoCheck ? 1 : 0 
		info.autoTitle = info.autoTitle ? 1 : 0
		try {
			await services.SiteChatController.baseEdit(info)
			message.success('修改成功')
		} catch (error) {
			
		}
	  }}>
        <ProFormTextArea
          name="defaultMsg"
          placeholder="请输入"
		  label={<>默认消息 <SubText>支持MarkDown语法</SubText></>}
        />
        <ProFormSwitch
          name="autoCheck"
		  label={<>KEY有效自动检查 <SubText>开启之后将会在设定的时间间隔范围内进行KEY有效检测，尝试3次失败后将会自动关闭该KEY的可用性</SubText></>}
        />
        {/* <ProFormSwitch
          name="autoTitle"
		  label={<>会话标题自动生成 <SubText>当用户的对话超过3轮且为默认标题时，由指定模型进行总结历史会话生成标题</SubText></>}
        /> */}
		<ProFormSelect
			request={async () => modeList}
			name="model"
			label={<>会话标题自动生成模型 
			{/* <SubText>您必须要在对话账号池中配置选中的模型账号，且为启用状态才可以正常使用此功能</SubText> */}
			</>}
		/>
        <ProFormDigit min={0} max={1000} name="interval"
		  label={<>Key检查间隔（分钟） <SubText>更改之后将会在当前下个检测周期生效</SubText></>}
		  />
        <ProFormText
          name="openAiProxy"
		  label={<>OpenAi反向代理 <SubText>默认接口域名：{baseInfo.openAi}</SubText></>}
          placeholder="请输入"
        />
        <ProFormText
          name="openAiSbProxy"
		  label={<>OpenAi-SB反向代理 <SubText>默认接口域名：{baseInfo.openAiSb}</SubText></>}
          placeholder="请输入"
        />
        <ProFormText
          name="api2dProxy"
		  label={<>Api2D反向代理 <SubText>默认接口域名：{baseInfo.api2d}</SubText></>}
          placeholder="请输入"
        />
        <ProFormText
          name="oneApiProxy"
		  label={<>自建OneAPI域名地址 <SubText>若使用Openapi平台，此值不能为空，末尾不要加/</SubText></>}
          placeholder="请输入"
        />
        <ProFormText
          name="otherProxy"
          label="其他平台反向代理"
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
