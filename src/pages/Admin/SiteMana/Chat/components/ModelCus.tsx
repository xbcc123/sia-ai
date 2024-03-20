import { SubText } from '@/components/Text/index';
import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import { IChatModel } from '@/types/chart';
import {
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Input, Space, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

const initChatModel = () => {
	return {
		id: `id-${Math.floor(Math.random() * 1000)}`,
		name: '', //名称
		key: '', //KEY值
		alias: '', //别名
		token: 0, //token
		open: 1, //是否开启 1 是 0 否
		sort: 1, //排序
		integral: 0, //消耗积分
		custom: 1, //是否属于自定义配置 0 否 1 是
	  };
}

export default () => {
  const [modelList, setModelList] = useState<IChatModel[]>([]);
  const formRef = useRef<{forms: any}>()

  useEffect(() => {
    getModelList();
  }, []);

  const getModelList = async () => {
    try {
      let data = await services.SiteChatController.modelList({ custom: 1 });
      data = data.length > 0 ? data : [initChatModel()];
	  data = data?.sort((a: any, b: any) => a.sort - b.sort)?.map?.((item: any) => {
		return {
			...item,
			...{
				id: `id-${Math.floor(Math.random() * 1000)}`
			}
		}
	  })
      setModelList(data);
    } catch (error) {}
  };

  return (
    <div>
      <Form.Provider
        onFormChange={(formName, info) => {
		  formRef.current = info
        }}
		onFormFinish={(formName, info) => {
		  formRef.current = info
        }}
      >
        <Tip
          title={'说明与注意事项'}
          des={
            <>
              <div>
                自定义模型禁止与系统已经内置的模型重合，如果您定义的模型名称和内置模型名称重合，那么会优先使用您的自定义模型中的相关配置，当然您需要尽力避免这一行为！
              </div>
            </>
          }
        ></Tip>
        <div
          style={{ marginTop: '32px', marginBottom: '16px', fontSize: '16px' }}
        >
          自定义模型列表
        </div>
        <Tip
          title={'提示'}
          des={
            <>
              <div>长按每列选项后拖拽图标可以上下拖动改变顺序</div>
            </>
          }
        ></Tip>

        <ReactSortable list={modelList} setList={setModelList}>
          {modelList.map((item: any, index: any) => (
            <CusModelItem
              list={modelList}
              info={item}
              onAdd={() => {
                if (modelList?.length > 20) {
                  message.error('最多增加20个');
                }
                modelList.splice(index, 0, initChatModel());
                setModelList([...modelList]);
              }}
              onDelete={() => {
                modelList.splice(index, 1);
                setModelList([...modelList]);
              }}
              key={item.id}
            ></CusModelItem>
          ))}
        </ReactSortable>
        <Space>
          <Button type="primary" htmlType="submit" onClick={async () => {
			let forms = formRef.current?.forms || {}
			let promiseList: any[] = []
			for(let formKey in forms) {
				promiseList.push(forms[formKey].validateFields())
			}
			try {
				let modes = await Promise.all(promiseList)
				modes = modes.filter(item => JSON.stringify(item) !== '{}') 
				for (let index = 0; index < modes.length; index++) {
					const mode = modes[index];
					const sort = modelList?.findIndex?.(item => item.id === mode.id) + 1   
					mode.sort = sort
					if(String(mode.id).includes('id')) {
						delete mode.id
					}
					mode.custom = 1
					mode.key = mode.alias
					mode.open = mode.open ? 1: 0
				}
				await services.SiteChatController.modelEdit(modes)
				message.success('保存成功')
			} catch (error) {
				
			}
		  }}>
            保存
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Provider>
    </div>
  );
};

const CusModelItem = ({ info, list, onAdd, onDelete }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (info) {
      let { id, alias, integral, open, name, token }: any = { ...info };
      form.setFieldsValue({
		id,
		name,
        alias,
        integral,
        open: open === 1,
		token
      });
	  form.submit()
    }
  }, [info]);

  const noDisplayStyle = {
	formItemProps: {
		style: {
			display: "none"
		}
	}
  }

  return (
    <Card style={{ marginBottom: 16 }}>
      <ProForm form={form} name={info.id} layout="vertical" submitter={false} >
        <Space wrap>
		  <ProFormText name="id" {...noDisplayStyle}/>
          <ProFormText
            name="name"
			rules={[{ required: true, message: '请输入' }]}
            label={
              <>
                模型名称
                <SubText>用于传递给平台的模型名称</SubText>
              </>
            }
          />
          <ProFormText
            name="alias"
			rules={[{ required: true, message: '请输入' }]}
            label={
              <>
                模型别名
                <SubText>用于展示给用户的名称</SubText>
              </>
            }
          />
          <ProFormDigit
            min={0}
            max={10000}
            fieldProps={{ precision: 0 }}
            name="integral"
			rules={[{ required: true, message: '请输入' }]}
            label={
              <>
                单次扣除积分
                <SubText>为0则不扣除积分</SubText>
              </>
            }
          />
          <ProFormDigit
            name="token"
			rules={[{ required: true, message: '请选择' }]}
            label={
              <>
                模型支持的最大Tokens
                <SubText>为0则不限制</SubText>
              </>
            }
          />
          <ProFormSwitch
            name="open"
			rules={[{ required: true }]}
            label={
              <>
                启用
                <SubText>启用后才能用该模型进行对话</SubText>
              </>
            }
          />
          <Space>
            <Button
              onClick={() => {
                onAdd?.();
              }}
            >
              添加模型
            </Button>
            <Button
              disabled={list?.length === 1}
              onClick={() => {
                onDelete?.();
              }}
            >
              删除
            </Button>
          </Space>
        </Space>
      </ProForm>
    </Card>
  );
};
