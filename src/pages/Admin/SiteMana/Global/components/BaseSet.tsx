import { SubText } from '@/components/Text';
import services from '@/services/admin';
import servicesMain from '@/services/main';
import { generateFile } from '@/utils/index';
import { customRequest, uploadButton, uploadSingleProps } from '@/utils/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, Upload, message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [placeholderImage, setPlaceholderImage] = useState<string>('');
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;

  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.baseInfo();
      setBaseInfo(data);
      let info = { ...data };
      info.logo = info?.logo
        ? [generateFile(`${setting?.domain}${info.logo}`, info?.logo)]
        : [];
      info.placeholderImage = info.placeholderImage
        ? [
            generateFile(
              `${setting?.domain}${info.placeholderImage}`,
              info.placeholderImage,
            ),
          ]
        : [];
      info.scrollList =
        info.scrollList?.map?.((item: string) => {
          const url = `${setting?.domain}${item}`;
          return generateFile(url, item);
        }) || [];
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
          if (info?.logo) {
            info.logo = info?.logo?.[0].response;
          }
          if (info?.placeholderImage) {
            info.placeholderImage = info?.placeholderImage?.[0].response;
          }
          if (info?.scrollList) {
            info.scrollList = info?.scrollList?.map?.(
              (item: any) => item.response,
            );
          }
          try {
            await services.SiteGlobalController.baseEdit(info);
            message.success('修改成功, 刷新页面后生效');
          } catch (error) {}
        }}
      >
        <ProFormText
          name="name"
          label="站点名称"
          placeholder="请输入名称"
          rules={[{ required: true }]}
        />
		<ProFormText
          name="keyword"
          label={<>站点关键字
		  {/* （用于SEO，多个之间用，进行分割） */}
		  </>}
          placeholder="请输入名称"
        />
        <ProFormTextArea name="description" label={<>站点描述
		{/* （用于SEO） */}
		</>} />
        
        <Form.Item
          name={'logo'}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          label={
            <>
              站点LOGO 
			  {/* <SubText>尽量选择1:1的LOGO图标</SubText> */}
            </>
          }
        >
          <Upload {...uploadSingleProps}>
            {uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label={<>登录页面轮播图</>}
          name="scrollList"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          {/* <BaseImages></BaseImages> */}
          <Upload customRequest={customRequest} listType="picture-card">
            {uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item
          name={'placeholderImage'}
          label={
            <>
              没有内容展示的图片 <SubText>例如绘画历史</SubText>
            </>
          }
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload
            {...uploadSingleProps}
            // beforeUpload={beforeUpload}
          >
            {/* <Form.Item noStyle shouldUpdate={(prevValues, curValues) =>
          JSON.stringify(prevValues.logo) !== JSON.stringify(curValues.logo)
        }>  {({ getFieldValue }) => {
			console.log(getFieldValue("logo"));
			return (
			  getFieldValue("logo") ? uploadButton : <span>111</span>
			)
		  }}</Form.Item> */}
            {uploadButton}
          </Upload>
        </Form.Item>
        {/* <ProFormSwitch
          name="hasSSL"
          label={
            <>
              站点SSL{' '}
              <SubText>
                如果您的站点开启了https，请务必勾选此选线，用于一些链接的直接生成
              </SubText>
            </>
          }
        /> */}
        {/* <ProFormText
          name="secret"
          label={
            <>
              站点密钥{' '}
              <SubText>
                用于进行用户TOKEN密钥以及身份验证使用，如果改变此值会使所有用户登录状态立即失效，注意千万别泄露或使用弱口令，否则会增加用户被盗风险（若为空则使用用户密码为key）
              </SubText>
            </>
          }
          placeholder="请输入"
        /> */}
        <ProFormText
          name="email"
          label={
            <>
              消息通知接收邮箱{' '}
              <SubText>用于KEY失效或者MJ用户身份失效等相关通知接收邮箱</SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormTextArea
          name="footer"
          label={
            <>
              全局底部内容 <SubText>备案信息，版权信息，支持HTML代码</SubText>
            </>
          }
        />
        <ProFormText
          name="scoreIcon"
          label={
            <>
              积分图标 <SubText>仅可输入Emoji，默认为 ✨</SubText>
            </>
          }
          placeholder="请输入"
        />

        <ProFormText
          name="domain"
          label={
            <>
              图片服务器地址
              <SubText>服务器地址，随意修改可能导致图片无法访问</SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormText
          name="frontPath"
          label={
            <>
              客户端部署路径
              <SubText>客户端部署路径地址，随意修改会导致SEO失效</SubText>
            </>
          }
          placeholder="请输入"
        />
      </ProForm>
    </div>
  );
};
