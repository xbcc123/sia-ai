import { SubText } from '@/components/Text';
import { Tip } from '@/components/Tip';
import { CaretRightOutlined } from '@ant-design/icons';
import services from '@/services/admin';
import {
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Collapse, CollapseProps, Form, message, theme } from 'antd';
import { createStyles } from 'antd-style';
import { CSSProperties, useEffect, useState } from 'react';


export default () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: '16px',
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const getItems = (panelStyle: CSSProperties): CollapseProps['items']  => {
	return modelList?.map?.((item: any) => {
		return  {
			key: item.name,
			label: item.key,
			children: <ModelSetItem key={item.name} info={item}></ModelSetItem>,
			style: panelStyle,
		  }
	})
  }

  const [modelList, setModelList] = useState([])

  useEffect(() => {
	getModelList()
  }, [])

  const getModelList = async () => {
	try {
		const data = await services.SiteChatController.modelList({custom: 0})
		setModelList(data)
	} catch (error) {
		
	}
  }

  return (
    <div>
      <ProForm form={form} submitter={false} onFinish={async () => {}}>
        <Collapse
          bordered={false}
        //   defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
          items={getItems(panelStyle)}
        />
      </ProForm>
    </div>
  );
};

const ModelSetItem = ({info}: any) => {
  const useStyles = createStyles(() => {
    return {};
  });
  const { styles } = useStyles();

  const [form] = Form.useForm()

  useEffect(() => {
	if(info) {
		let {alias, integral, open}: any = {...info}
		form.setFieldsValue({
			alias,
			integral,
			open: open === 1
		})
	}
  }, [info])

  return (
    <>
      {/* <Tip
        title="模型说明"
        des={
          <>
            模型默认传递名称为：{info?.name}（如果您使用的平台（例如OneAPI）非此标识，请进行对应的模型名称映射才可以使用）
          </>
        }
      ></Tip> */}

      <ProForm form={form} onFinish={async({open, integral, alias}) => {
		try {
			await services.SiteChatController.defaultModelEdit({
				id: info.id,
				name: info.name, //名称
				key: info.key, //KEY值
				alias, //别名
				open: open ? 1 : 0, //是否开启 1 是 0 否
				integral, //消耗积分
				custom: 0, //是否属于自定义配置 0 否 1 是
				sort: info.sort,
			})
			message.success('修改成功')
		} catch (error) {
			
		}
	  }}>
        <ProFormSwitch
          name="open"
          label={
            <>
              模型禁用
			   {/* <SubText>禁用之后无法使用该模型进行对话</SubText> */}
            </>
          }
        />
        <ProFormDigit
          width={200}
          min={0}
          max={100000}
          name="integral"
          label={
            <>
              单次扣除积分 
			  {/* <SubText>为0则不扣除积分</SubText> */}
            </>
          }
        />
        <ProFormText
          width={200}
          name="alias"
          label="模型别名"
          placeholder="请输入"
        />
      </ProForm>
    </>
  );
};
