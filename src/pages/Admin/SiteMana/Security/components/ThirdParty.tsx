import { Tip } from '@/components/Tip';
import {
	CaretRightOutlined,
  } from '@ant-design/icons';
  import {
	ProForm,
	ProFormSwitch,
	ProFormText,
  } from '@ant-design/pro-components';
  import {Collapse, CollapseProps, Form, theme, message, Typography} from 'antd';
  import { createStyles } from 'antd-style';
  import {CSSProperties, useEffect, useState} from 'react';
import services from '@/services/admin';
  
  export default () => {
	const [form] = Form.useForm();
	const { token } = theme.useToken();

	
	// const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
	//   panelStyle,
	// ) => [
	//   {
	// 	key: '1',
	// 	label: '百度内容审核',
	// 	children: <ModelSetItem></ModelSetItem>,
	// 	style: panelStyle,
	//   },
	// ];
  
	// const panelStyle: React.CSSProperties = {
	//   marginBottom: '16px',
	//   background: token.colorFillAlter,
	//   borderRadius: token.borderRadiusLG,
	//   border: 'none',
	// };
  
	return (
	  <div>
		<Typography.Title level={5}>百度内容审核</Typography.Title>
		<ModelSetItem></ModelSetItem>
		  {/* <Collapse
			bordered={false}
			defaultActiveKey={['1']}
			expandIcon={({ isActive }) => (
			  <CaretRightOutlined rotate={isActive ? 90 : 0} />
			)}
			style={{ background: token.colorBgContainer }}
			items={getItems(panelStyle)}
		  /> */}
	  </div>
	);
  };
  
  const ModelSetItem = () => {
	const [form] = Form.useForm();
	const [baseInfo, setBaseInfo] = useState<any>({});

	useEffect(() => {
	  getBaseInfo();
	}, []);
  
	const getBaseInfo = async () => {
	  try {
		let data = await services.SiteSecurityController.thirdInfo();
		setBaseInfo(data);
		let info = { ...data };
		form.setFieldsValue(info);
	  } catch (error) {}
	};
  
	return (
	  <>
	  	{/* <Tip title='提示' des={<>请到百度智能云应用中心获取下面API配置</>}></Tip> */}
		<ProForm form={form}  onFinish={async (values) => {
			 let info = { ...values };
			 try {
			   await services.SiteSecurityController.thirdEdit(info);
			   message.success('修改成功');
			 } catch (error) {}
		}} >
		  <ProFormSwitch name="open" label="开启" />
		  <ProFormText name="apiKey" label="API Key" placeholder="请输入" />
		  <ProFormText name="secretKey" label="Secret Key" placeholder="请输入" />
		</ProForm>
	  </>
	);
  };
  