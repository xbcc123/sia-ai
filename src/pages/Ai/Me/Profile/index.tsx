import { ATag } from '@/components/Tag/ATag';
import { WeChatLoginModal } from '@/pages/Login/components/WeChatLogin';
import services from '@/services/ai';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Avatar, Button, Card, Form, Upload, message } from 'antd';
import { useEffect, useState } from 'react';
import { AvaModal } from './components/AvaModal';
import { BindModal, CodeType } from './components/BindModal';
import useStyles from './index.module.style';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import {customRequest} from '@/utils/upload';

const beforeUpload = (file: RcFile) => {
	return true
};

  
export default () => {
  const { styles } = useStyles();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<
    Partial<{
      userId: string;
      email: string;
      nickName: string;
      phone: string;
      avatar: string;
      openId: string;
    }>
  >({});
//   const [avaModalVisible, setAvaModalVisible] = useState(false);
  const [bindModalVisible, setBindModalVisible] = useState(false);
  const [weChatVisible, setWeChatVisible] = useState<boolean>(false);
  const [codeType, setCodeType] = useState<CodeType>('phone');
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { loginSetting, setting } = initialState;

  useEffect(() => {
    getUserInfo();
  }, []);

  // 获取信息
  const getUserInfo = async () => {
    try {
      const data = await services.LoginController.userInfo();
      setUserInfo(data);
	  setImageUrl(`${setting.domain}${data?.avatar}`)
      form.setFieldsValue(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {}
  };

  // 设置头像
  const changeAvatar = async (avatar: string) => {
    try {
      await services.LoginController.editInfo({
        avatar,
      });
      getUserInfo();
    } catch (error) {}
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
	    setLoading(false);
		setImageUrl(`${setting.domain}${info.file.response}`)
		changeAvatar(info.file.response)
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  );

  const isShowWx = loginSetting?.openWxPublic && !userInfo?.openId;

  const btnStyle = {
    padding: '0 3px',
  };

  return (
    <div className={styles.container}>
      <Card
        title={<div style={{ fontSize: 16 }}>个人资料</div>}
        style={{ width: '100%' }}
        bordered
      >
        {/* {userInfo?.avatar && (
          <Avatar
            size={'large'}
            shape="square"
            src={require(`@/assets/images/ava/${userInfo?.avatar || 'b2'}.png`)}
            style={{
              width: 80,
              height: 80,
              cursor: 'pointer',
              backgroundColor: '#CCCCCC',
            }}
            onClick={() => {
              setAvaModalVisible(true);
            }}
          ></Avatar>
        )} */}
  	  <Upload
        showUploadList={false}
		customRequest={customRequest} 
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <Avatar
            size={'large'}
            shape="square"
            src={imageUrl}
            style={{
              width: 80,
              height: 80,
              cursor: 'pointer',
            //   backgroundColor: '#CCCCCC',
            }}
          ></Avatar>: uploadButton}
      </Upload>
        {/* <Typography.Paragraph style={{ marginTop: 8 }}>
          欢迎您：{' '}
          <span
            style={{
              color: token.colorPrimary,
            }}
          >
            {userInfo?.nickName}
          </span>
        </Typography.Paragraph> */}
        {/* 
		<Tabs defaultActiveKey="1" items={[
			{
				key: '1',
				label: `基本信息`,
			},
			{
				key: '2',
				label: `账户安全`,
			},
		]}/> */}
        <ProForm
          form={form}
          layout={'horizontal'}
		  style={{ maxWidth: 600, marginTop: 24 }}
          onFinish={async ({ nickName }) => {
            try {
              await services.LoginController.editInfo({
                nickName,
              });
              message.success('修改成功');
              getUserInfo();
            } catch (error) {}
          }}
          submitter={{
            // 完全自定义整个区域
            render: (props, doms) => {
              return [
                <div style={{ width: '100%' }}>
                  <Button
                    type="primary"
                    style={{ marginLeft: '150px' }}
                    onClick={() => props.form?.submit()}
                  >
                    保存信息
                  </Button>
                </div>,
              ];
            },
          }}
        >
          <ProFormText label="ID" name="userId" disabled />
          <ProFormText
            label="邮箱"
            name="email"
            placeholder={'邮箱'}
            disabled
          />
          <ProFormText
            label="手机号"
            name="phone"
            placeholder={'手机号'}
            disabled
          />
          <ProFormText label="昵称" name="nickName" />
          {isShowWx && (
            <Form.Item label="绑定微信">
              {userInfo?.openId ? (
                <ATag type="sucess">是</ATag>
              ) : (
                <ATag type="error">否</ATag>
              )}
            </Form.Item>
          )}

          <Form.Item label="操作">
            {!userInfo?.phone && (
              <Button
                type="link"
                style={btnStyle}
                onClick={() => {
                  setBindModalVisible(true);
                  setCodeType('phone');
                }}
              >
                绑定手机号
              </Button>
            )}
            {!userInfo?.email && (
              <Button
                type="link"
                style={btnStyle}
                onClick={() => {
                  setBindModalVisible(true);
                  setCodeType('email');
                }}
              >
                绑定邮箱
              </Button>
            )}
            {isShowWx && (
              <Button
                type="link"
                style={btnStyle}
                onClick={() => {
                  setWeChatVisible(true);
                }}
              >
                绑定微信号
              </Button>
            )}
            {userInfo?.phone && userInfo?.email && !isShowWx && '-'}
          </Form.Item>
        </ProForm>
      </Card>

      {/* <AvaModal
        avaModalVisible={avaModalVisible}
        setAvaModalVisible={setAvaModalVisible}
        editUserInfo={editUserInfo}
      ></AvaModal> */}

      <BindModal
        bindModalVisible={bindModalVisible}
        onCancel={() => {
          setBindModalVisible(false);
        }}
        codeType={codeType}
      ></BindModal>

      <WeChatLoginModal
        type="bind"
        visible={weChatVisible}
        onCancel={function (): void {
          setWeChatVisible(false);
        }}
        bindSucess={() => {
          setWeChatVisible(false);
          getUserInfo();
        }}
      ></WeChatLoginModal>
    </div>
  );
};
