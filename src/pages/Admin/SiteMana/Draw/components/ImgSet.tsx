import { Tip } from '@/components/Tip/index';
import services from '@/services/admin';
import {
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteDrawController.showInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <Tip
        title={'配置提示'}
        des={
          <>
            <div>
              {' '}
              •
              下载到本地：程序自身去拉取响应的图片到您的服务器，同时自带缓存机制且绘画列表及画廊列表会使用缩略图模式，前提需要本程序处于可访问cdn.discordapp.com的环境
            </div>
            <div>
              {' '}
              • 直接显示：若您的用户可以直接访问cdn.discordapp.com则可以选用
            </div>
            <div>
              {' '}
              •
              自定义反向代理：请下方填入反向代理https://cdn.discordapp.com的域名即可
            </div>
          </>
        }
      ></Tip>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteDrawController.showEdit(info);
            message.success('修改成功');
          } catch (error) {}
        }}
      >
        <ProFormRadio.Group
          name="method"
          label="展示方式"
          options={[
            {
              label: '下载到本地',
              value: 'LOCAL',
            },
            {
              label: '直接显示',
              value: 'DirectShow',
            },
            {
              label: '自定义反向代理',
              value: 'Proxy',
            },
          ]}
        />
        <ProFormDependency name={['method']}>
          {({ method }) => {
            return (
				method === 'Proxy' && <ProFormText
                name="proxy"
                label={
                  <>
                    反向代理地址
                    {/* <SubText>一般不需要修改，除非官方更新了版本后您需要重新再此处填入最新的版本</SubText> */}
                  </>
                }
                placeholder="请输入"
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
};
