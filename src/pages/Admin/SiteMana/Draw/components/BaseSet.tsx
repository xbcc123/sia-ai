import {
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import {Form, message} from 'antd';
import {SubText} from '@/components/Text/index';
import {useEffect, useState} from 'react';
import services from '@/services/admin';
import {useModel} from '@umijs/max';

export default () => {
  const [form] = Form.useForm();
  const { modeList} = useModel('modes');
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteDrawController.commonInfo();
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
			 await services.SiteDrawController.commonEdit(info);
			 message.success('修改成功');
		   } catch (error) {}
	  }}>
        <ProFormSwitch name="stop" label={
          <>
			是否停用
            {/* <SubText>开启之后当所有的任务队列会持续睡眠1分钟，直到关闭维护（即时生效）</SubText> */}
          </>
        }   />
        <ProFormSwitch name="filterParam" 
		label={
			<>
			  过滤提示词中的--fast，--relax以及--turbo参数模式
			  {/* <SubText>清除用户提示词中的--fast，--relax以及--turbo参数，防止用户消耗更多时长</SubText> */}
			</>
		  }   />
        <ProFormSwitch name="autoTranslate" label={
			<>
			  自动翻译中文
			  {/* <SubText>开启之后会使用配置的翻译方式进行翻译用户输入描述的非英文内容</SubText> */}
			</>
		  }  />
        <ProFormSelect
          name="model"
		  request={async () => modeList}
		  label={
			<>
			  自动翻译模型
			  {/* <SubText>您必须在对话账号池中配置选中的模型账号，且为启用状态才可以使用自动翻译模型</SubText> */}
			</>
		  }
          placeholder="请输入"
        />
        <ProFormText name="imagineVersion"   label={
			<>
			  绘画版本
			  {/* <SubText>一般不需要修改，除非官方更新了版本后您需要重新再此处填入最新的版本</SubText> */}
			</>
		  }  placeholder="请输入" />
        <ProFormText name="blendVersion"  label={
			<>
			  绘画混图版本
			  {/* <SubText>一般不需要修改，除非官方更新了版本后您需要重新再此处填入最新的版本</SubText> */}
			</>
		  } placeholder="请输入" />
        <ProFormText
          name="describeVersion"
		  label={
			<>
			  绘画咒语解析版本
			  {/* <SubText>一般不需要修改，除非官方更新了版本后您需要重新再此处填入最新的版本</SubText> */}
			</>
		  }
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
