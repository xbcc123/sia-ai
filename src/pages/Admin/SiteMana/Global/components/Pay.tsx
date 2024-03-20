import { SubText } from '@/components/Text';
import services from '@/services/admin';
import {
  ProForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {Divider, Form, Typography, message} from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [baseInfo, setBaseInfo] = useState<any>({});

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.payInfo();
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
			  await services.SiteGlobalController.payEdit(info);
			  message.success('修改成功, 刷新页面后生效');
			} catch (error) {}
	  }}>
        <ProFormSwitch
          name="stop"
          label={
            <>
              停用支付{' '}
              {/* <SubText>
                开启之后用户无法再创建新订单支付
              </SubText> */}
            </>
          }
        />
        <ProFormTextArea
          name="stopPrompt"
          label={
            <>
              支付停用提示 
			  {/* <SubText>输入之后将会覆盖系统默认提示</SubText> */}
            </>
          }
          placeholder="请输入"
        />
        <ProFormTextArea
          name="payPrompt"
          label={
            <>
              点击支付弹窗提示{' '}
              <SubText>支持HTML</SubText>
            </>
          }
          placeholder="请输入"
        />
        <ProFormTextArea
          name="content"
          placeholder="请输入"
          label={
            <>
              产品页公告 <SubText>支持HTML</SubText>
            </>
          }
        />

        <div>
          <Divider plain>
            <Typography.Title level={5}>微信支付</Typography.Title>
          </Divider>
		  <ProFormSwitch name="hasWxPay" label={<>启用微信支付</>} />
          <ProFormText name="wxMchId" label="商户ID" placeholder="请输入" />
          <ProFormText
            name="wxMchSerialNumber"
            label="商户号"
            placeholder="请输入"
          />
          <ProFormText
            name="wxAppId"
            label={
              <>
                应用ID{' '}
                <SubText>例如公众号场景下，需要使用属性为公众号的APPID</SubText>
              </>
            }
            placeholder="请输入"
          />
          <ProFormSwitch
            name="wxSupportJsApi"
            label={
              <>
                <div style={{ width: 230 }}>微信内置浏览器JSAPI支持</div>
                <SubText>
                  配置次选项必须要开通微信支付【jsapi】应用，且在本站【全局配置】-【登录授权】-【微信公众号登录】中填入绑定商户的应用ID的公众号登录授权配置才可以正常使用，否则无法使用（注意：因微信限制，使用此选项会在支付时进行刷新页面支付）
                </SubText>
              </>
            }
          />

          <ProFormText
            name="wxApiV3Key"
            placeholder="请输入"
            label={
              <>
                商户APIv3密钥{' '}
                <SubText>
                  请到微信商户平台-【用户中心】-【API安全】-【设置APIv3密钥】中进行设置再填入
                </SubText>
              </>
            }
          />
          <ProFormTextArea
            name="wxPrivateKey"
            label="商户API私钥"
            placeholder="请输入"
          />
        </div>

        <div>
          <Divider plain>
            <Typography.Title level={5}>支付宝支付</Typography.Title>
          </Divider>
          <ProFormSwitch name="hasAliPay" label={<>启用支付宝支付</>} />
          <ProFormText
            name="apAppId"
            label={
              <>
                应用ID{' '}
              </>
            }
            placeholder="请输入"
          />
          <ProFormTextArea
            name="apMchPrivateKey"
            label="开发者私钥"
            placeholder="请输入"
          />
		      <ProFormTextArea
            name="apPublicKey"
            label="支付宝公钥"
            placeholder="请输入"
          />
        </div>
      </ProForm>
    </div>
  );
};
