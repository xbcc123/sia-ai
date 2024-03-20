import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Modal, message, Image, Space } from 'antd';
import { useRef } from 'react';

// 问题反馈
export const FeedBack = ({
  open,
  onSubmit,
  onCancel,
}: {
  open: boolean;
  onSubmit: (val: any) => void;
  onCancel: (val: any) => void;
}) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
	  width={450}
	  styles={{
		body: {
			padding: 32,
		}
	  }}
      footer={[
        // <Button
        //   type="primary"
        //   onClick={() => {
        //     console.log(formRef.current?.getFieldsValue());
        //     onSubmit({});
        //     message.success('提交成功');
        //   }}
        // >
        //   提交
        // </Button>,
      ]}
    >
      <ProForm<{}>
        onFinish={async (values: any) => {
        }}
        formRef={formRef}
        params={{}}
        submitter={false}
        autoFocusFirstInput
      >
        {/* <ProFormTextArea
          fieldProps={{
            showCount: true,
            maxLength: 500,
          }}
          name="question"
          label="遇到的问题"
          placeholder="请输入遇到的问题"
        />
        <ProFormText
          name="company"
          label="联系方式"
          placeholder="请输入联系方式，微信/手机号"
        /> */}
        {/* <div style={{marginBottom: 16}}>直接联系我们</div> */}
		<Space>
			<div>   <div style={{marginBottom: 16}}>微信</div>
        <Image
          width={150}
          src={require('@/assets/images/wechat2.jpg')}
        /></div>
		<div>	<div style={{marginBottom: 16}}>公众号</div>
		 <Image
          width={150}
          src={require('@/assets/images/gongzhonghao.jpeg')}
        /></div>
		</Space>
     
	
      </ProForm>
    </Modal>
  );
};
