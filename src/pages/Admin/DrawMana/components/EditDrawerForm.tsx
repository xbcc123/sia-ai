import services from '@/services/admin';
import {DrawerForm, ProFormCheckbox, ProFormRadio, ProFormSwitch, ProFormText, ProFormDigit} from '@ant-design/pro-components';
import { Divider, Form, message } from 'antd';
import { useEffect } from 'react';
import { Tip } from '@/components/Tip';
import { SubText } from '@/components/Text';
import {accountCreate, accountEdit} from '../../../../services/admin/DrawController';

export const EditDrawerForm = ({
  isEdit,
  visible,
  detail,
  onClose,
  onOk,
}: {
  isEdit: boolean;
  visible: boolean;
  detail: any;
  onClose: () => void;
  onOk: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (isEdit) {
        let info = { ...detail };
        info.isValid = detail.isValid === 1;
        form.setFieldsValue(info);
      } else {
        form.setFieldsValue({
			platform: 'Discord Midjourney',
			isValid: false,
			conQueueSize: 1, //并发队列大小
			waitQueueSize: 1, //等待队列大小
			timeout: 1 //超时时间(分钟)
        });
      }
    }
  }, [visible]);

  return (
    <DrawerForm
      title="编辑"
      layout="vertical"
      open={visible}
      form={form}
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        onClose: () => {
          onClose();
        },
      }}
      onFinish={async (values) => {
        let params: any = { ...values };
        params.isValid = params.isValid ? 1 : 0;
        try {
          if (isEdit) {
            params.id = detail?.id;
            await services.DrawController.accountEdit(params);
          } else {
            await services.DrawController.accountCreate(params);
          }
          onOk();
          message.success('提交成功');
          onClose();
        } catch (error) {}
        return true;
      }}
    >
      <ProFormText label="名称" name={'name'} rules={[{ required: true }]} />
	  <ProFormRadio.Group
        name="platform"
        label="类型"
        options={[
			{
				label: 'Discord Midjourney',
				value: 'Discord Midjourney',
			}
		]}
      />
	      <Divider>配置信息</Divider>
    <ProFormSwitch
        name={'isValid'}
		label={<>
			可用性
			<SubText>只有开启可用用户才可以使用，修改数据之后需要手动启动/停止才会生效</SubText>
		</>}
        rules={[{ required: true }]}
      ></ProFormSwitch>
      <ProFormText label="Discord服务器ID" name={['config', 'discordServerId']} rules={[{ required: true }]} />
      <ProFormText label="Discord频道ID" name={['config', 'discordChannelId']} rules={[{ required: true }]} />
      <ProFormText label="Discord用户Token" name={['config', 'discordUserToken']} rules={[{ required: true }]} />
      {/* <ProFormText label="Discord机器人Token" name={['config', 'discordRobotToken']} rules={[{ required: true }]} /> */}
      <ProFormText label="Discord SessionlD " name={['config','discordSessionId']} rules={[{ required: true }]} />
	  {/* <Tip title={'队列大小配置必看'} des={<>
		绘画账号池并发队列大小和等待队列大小和Redis连接池一一对应相关，默认Redis连接池大小CPU数量”20.所以给画账号池所有给画账号累计并发队列大小+ 等待队别大小的总大小不得超过 P量  28  10 其中10个连接用于其他相关作，您也可以设置为更大，依然您的用户数量和并发自行调整) 。如果您需要自定义Redis连接池大小，请到配置文件 onfig,ym 中 redis => pool-size 的数量(修改之后需要重启整个系统才会生效)如果超过则日志会出现 redis: connection pool timeut 相关字样的错误，此时需要依据上方说明调整配置!
	  </>}></Tip> */}
	  <ProFormDigit
		label={<>
			并发队列大小
		<SubText>最小为1</SubText>
		</>}
        name={['config','conQueueSize']}
        min={1}
        max={1000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
	  	  <ProFormDigit
		label={<>
			等待队列大小
		<SubText>最小为1</SubText>
		</>}
        name={['config', 'waitQueueSize']}
        min={1}
        max={1000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
	  	  <ProFormDigit
		label={<>
			超时时间
		<SubText>最小为1</SubText>
		</>}
		name={['config', 'timeout']}
        min={1}
        max={1000}
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }}
      />
    </DrawerForm>
  );
};

