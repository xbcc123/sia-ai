import { SubText } from '@/components/Text/index';
import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import {
  ProForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Space, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

interface ItemType {
	id: string;
	name: string;
	icon: string;
	action: string; 
	value: string;
	hasLogin: boolean;
	supportMobile: boolean;
	open: boolean;
	sort: number;
}

const initMenuItem = (): ItemType => {
  return {
    id: `id-${Math.floor(Math.random() * 1000)}`,
    name: '', //菜单名称
    icon: '', //图标
    action: 'link', //操作类型 link:新窗口链接 inner:内嵌网页
    value: '', //操作值
    hasLogin: true, //需要登录
	supportMobile: false, // 是否移动端显示
    open: true, //启用
    sort: 0, //排序
  };
};

export default () => {
  const [form] = Form.useForm();
  const formRef = useRef<{ forms: any }>();
  const [customList, setCustomList] = useState<ItemType[]>([initMenuItem()]);
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();

  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteMenusController.userInfo();
      setBaseInfo(data);
	  let info = { ...data };
      form.setFieldsValue(info)
	  let customList = data.customList || []
	  customList = customList?.length > 0 ? customList : [initMenuItem()];
	  customList = customList?.sort((a: any, b: any) => a.sort - b.sort)?.map?.((item: ItemType) => {
		return {
			...item,
			...{
				id: `id-${Math.floor(Math.random() * 1000)}`
			}
		}
	  })
      setCustomList(customList);
    } catch (error) {}
  };

  return (
    <div>
      <Form.Provider
        onFormChange={(formName, info) => {
          formRef.current = info;
        }}
		onFormFinish={(formName, info) => {
			formRef.current = info
		}}
      >
        <ProForm
          name="form"
          layout="inline"
          submitter={false}
          form={form}
          onFinish={async () => {}}
        >
          <ProFormSwitch name="chatOpen" label="AI对话" />
          <ProFormSwitch name="imageOpen" label="AI绘画" />
          <ProFormSwitch name="appOpen" label="应用" />
          <ProFormSwitch name="galleryOpen" label="画廊" />
          <ProFormSwitch name="senceOpen" label="AI工具" />
          <ProFormSwitch name="meOpen" label="我" />
        </ProForm>
        <div
          style={{ marginTop: '32px', marginBottom: '16px', fontSize: '16px' }}
        >
          自定义菜单
        </div>
        {/* <Tip
          title={'提示'}
          des={
            <>
              <div>长按每列选项后拖拽图标可以上下拖动改变顺序</div>
              <div>建议最多3个动态菜单，否则过多会导致展示过于密集或者错位</div>
            </>
          }
        ></Tip> */}
        {/* <ReactSortable list={customList} setList={setCustomList} onUpdate={(e) => {
		}}> */}
          {customList?.map?.((item, index) => (
            <CusMenuItem
              list={customList}
              info={item}
              onAdd={() => {
                if (customList?.length > 20) {
                  message.error('最多增加20个');
                }
                customList.splice(index, 0, initMenuItem());
                setCustomList([...customList]);
              }}
              onDelete={() => {
                customList.splice(index, 1);
                setCustomList([...customList]);
              }}
              key={item.id}
            ></CusMenuItem>
          ))}
        {/* </ReactSortable> */}
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            onClick={async () => {		
              let forms = formRef.current?.forms || {};
              let promiseList: any[] = [];
              for (let formKey in forms) {
				if(formKey !== 'form') {
					promiseList.push(forms[formKey].validateFields());
				}
              }
              try {
                let modes = await Promise.all(promiseList);
				modes = modes.filter(item => JSON.stringify(item) !== '{}') 
				const form = await forms['form'].validateFields()
                for (let index = 0; index < modes.length; index++) {
                  const mode = modes[index];
				//   const sort = customList?.findIndex?.(item => item.id === mode.id) + 1   
                //   mode.sort = sort
				  if (String(mode.id).includes('id')) {
                    delete mode.id;
                  }
                }
				let params = {
					...form,
					customList: modes
				}
                await services.SiteMenusController.userEdit(params);
				getBaseInfo()
                message.success('保存成功');
              } catch (error) {}
            }}
          >
            保存
          </Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Provider>
    </div>
  );
};

const CusMenuItem = ({ info, list, onAdd, onDelete }: any) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (info) {
      let { sort, id, name, icon, action, value, hasLogin, supportMobile, open }: any = { ...info };
      form.setFieldsValue({
		sort,
        id,
        name,
        action,
        icon,
        value,
        hasLogin,
		supportMobile,
        open,
      });
	  form.submit()
    }
  }, [info]);

  const noDisplayStyle = {
    formItemProps: {
      style: {
        display: 'none',
      },
    },
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <ProForm form={form} name={info.id} layout="inline" submitter={false}>
        <Space wrap>
          <ProFormText name="id" {...noDisplayStyle} />
          <ProFormText name="sort" />
          <ProFormText
            name="name"
            label={
              <>
                菜单名称
                <SubText>建议2-4个字</SubText>
              </>
            }
          />
          <ProFormText
            name="icon"
            label={
              <>
                图标
                <SubText>支持Emoji，fontawesome</SubText>
              </>
            }
          />
          <ProFormSelect
            options={[
              {
                label: '新窗口链接',
                value: 'link',
              },
              {
                label: '内嵌网页',
                value: 'inner',
              },
            ]}
            name="action"
            label="操作类型"
          />
          <ProFormText name="value" label="操作值" />
          {/* <ProFormSwitch name="text" label="移动端显示" /> */}
          <ProFormSwitch name="hasLogin" label="需要登录" />
          <ProFormSwitch name="supportMobile" label="移动端显示" />
          <ProFormSwitch name="open" label="启用" />
          <Space>
            <Button
              onClick={() => {
                onAdd?.();
              }}
            >
              新增菜单
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
