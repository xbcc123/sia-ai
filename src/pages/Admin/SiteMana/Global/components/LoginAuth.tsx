import { SubText } from '@/components/Text';
import services from '@/services/admin';
import servicesMain from '@/services/main';
import { uploadButton, uploadSingleProps } from '@/utils/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Form, Upload, UploadProps, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import {generateFile} from '@/utils/index';

export default () => {
  const [form] = Form.useForm();

  const [baseInfo, setBaseInfo] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;

  useEffect(() => {
    getBaseInfo();
  }, []);

  const getBaseInfo = async () => {
    try {
      let data = await services.SiteGlobalController.authLoginInfo();
	  let info = { ...data };
      info.wxQrcode = info.wxQrcode
        ? [
            generateFile(
              `${setting?.domain}${info.wxQrcode}`,
              info.wxQrcode,
            ),
          ]
        : [];
      setBaseInfo(data);
      form.setFieldsValue(info);
    } catch (error) {}
  };

  return (
    <div>
      <ProForm
        form={form}
        onFinish={async (values) => {
          let info = { ...values };
		  if (info?.wxQrcode) {
            info.wxQrcode = info?.wxQrcode?.[0].response;
          }
          try {
            await services.SiteGlobalController.authLoginEdit(info);
            message.success('修改成功, 刷新页面后生效');
          } catch (error) {}
        }}
      >
        {/* <ProFormDigit
          min={0}
          max={10000}
          fieldProps={{}}
          name="expireDay"
          label="授权过期天数"
          placeholder="请输入"
        /> */}
        <ProFormSwitch
          name="hasAuth"
          label={
            <>
              游客免登录{' '}
              {/* <SubText>
                开启后用户无需登录就可以访问界面，其他功能会跳转登录页
              </SubText> */}
            </>
          }
        />
        <ProFormSwitch
          name="hasBindPhone"
          label={
            <>
              必须绑定手机{' '}
              {/* <SubText>用户必须绑定手机号码才可以使用本站服务</SubText> */}
            </>
          }
        />
        <ProFormSwitch
          name="hasBindEmail"
          label={
            <>
              必须绑定邮箱{' '}
              {/* <SubText>用户必须绑定手机号码才可以使用本站服务</SubText> */}
            </>
          }
        />
        {/* <Tip
          title={'提示'}
          des={
            '如果同时关闭手机号码和邮箱注册，那么将不会再显示注册入口以及相关注册业务'
          }
        ></Tip> */}
        <ProFormSwitch name="openPhone" label={<>手机号码注册登录</>} />
        <ProFormSwitch name="openEmail" label={<>邮箱注册登录</>} />
        {/* <ProFormSwitch
          name="hasRegisterPhone"
          label={
            <>
              手机号码注册{' '}
              <SubText>
                开启之后用户才可以使用手机号注册，绑定等相关操作
              </SubText>
            </>
          }
        />
        <ProFormSwitch
          name="openPhone"
          label={
            <>
              手机号码真实性验证{' '}
              <SubText>
                用户注册，绑定，更换手机号时验证，若关闭时用户注册，解绑，换绑不再验证手机真假（开启之前必须配置短信发信配置）
              </SubText>
            </>
          }
        />
        <ProFormSwitch
          name="openPhone"
          label={
            <>
              手机号码验证码登录 <SubText>开启之前必须配置短信发信配置</SubText>
            </>
          }
        />
        <ProFormSwitch
          name="hasRegisterEmail"
          label={
            <>
              邮箱注册{' '}
              <SubText>开启之后用户才可以使用邮箱注册，绑定等相关操作</SubText>
            </>
          }
        />
        <ProFormSwitch
          name="openEmail"
          label={
            <>
              邮箱真实性验证{' '}
              <SubText>
                用户注册，绑定，更换邮箱时验证，若关闭时用户注册，解绑，换绑不再验证邮箱真假（开启之前必须配置邮箱发信配置）
              </SubText>
            </>
          }
        />
        <ProFormSwitch
          name="openEmail"
          label={
            <>
              邮箱验证码登录 <SubText>开启之前必须配置短信发信配置</SubText>
            </>
          }
        /> */}
        <ProFormSwitch name="openWxPublic" label={<>微信公众号登录</>} />
        <ProFormText name="wxPublicToken" label={<>微信公众号Token</>} />
        <ProFormText name="wxEncodingAESKey" label={<>消息加密密钥</>} />
		<Form.Item
          name={'wxQrcode'}
          valuePropName="fileList"
          getValueFromEvent={(e: any) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          label={
            <>
              微信公众号二维码
            </>
          }
        >
          <Upload {...uploadSingleProps}>
            {uploadButton}
          </Upload>
        </Form.Item>
		
		
{/* 		
        <Form.Item name={'wxQrcode'} label={<>微信公众号二维码</>}>
          <Upload
            name="wxQrcode"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={`${setting?.domain}${imageUrl}`}
                alt="wxQrcode"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
                  选择图片
                </div>
              </div>
            )}
          </Upload>
        </Form.Item> */}
        {/* <ProFormText name="wxQrcode" label={<>微信公众号二维码</>} /> */}
      </ProForm>
    </div>
  );
};
