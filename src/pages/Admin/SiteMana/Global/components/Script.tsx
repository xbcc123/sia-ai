import { SubText } from '@/components/Text';
import services from '@/services/admin';
import { changeGlobalStyles, themeProvider } from '@/valtioStore';
import { ProForm, ProFormDigit, ProFormRadio, ProFormSwitch, ProFormTextArea } from '@ant-design/pro-components';
import { snapshot, useSnapshot } from '@umijs/max';
import { Form, message } from 'antd';
import { cloneDeep, merge } from 'lodash';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});
  let { theme } = useSnapshot(themeProvider);

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.styleInfo();
      setBaseInfo(data);
      let info = { ...data };
      form.setFieldsValue(info);
    } catch (error) {}
  };
  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          try {
            await services.SiteGlobalController.styleEdit(info);
			localStorage.removeItem('themeMode')
			changeGlobalStyles(info)
            message.success('修改成功');
          } catch (error) {}
        }}
      >
        {/* <ProFormDigit
          min={0}
          max={1000}
          name="globalBoxRadius"
          label="全局盒子圆角"
        /> */}
		<ProFormRadio.Group name={"themeMode"} label="默认主题" options={[
			{
				label: '暗色',
				value: 'dark'
			},
			{
				label: '亮色',
				value: 'light'
			},
			{
				label: '自动',
				value: 'auto'
			}
		]}></ProFormRadio.Group>
		{/* <ProFormDigit
          min={0}
          max={1000}
          name="globalBoxRadius"
          label="全局盒子圆角"
        /> */}
        <ProFormTextArea
          name="antdStyles"
		  fieldProps={{
			rows: 6
		  }}
          label={
            <>
              全局自定义antd主题配置
              <SubText>
                <a target="_blank" href="https://ant.design/theme-editor-cn">
                  主题编辑器
                </a>
              </SubText>
            </>
          }
          placeholder="请输入"
        />
        {/* <ProFormTextArea
          name="globalCustomCss"
          label="全局自定义css"
          placeholder="请输入"
        /> */}
        <ProFormTextArea
          name="headerPvCode"
          label="头部流量统计代码"
		  fieldProps={{
			rows: 6
		  }}
          placeholder="请输入"
        />
        <ProFormTextArea
          name="footerPvCode"
          label="底部流量统计代码"
		  fieldProps={{
			rows: 6
		  }}
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
