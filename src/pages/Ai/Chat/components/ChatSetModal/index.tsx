import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import useStyles from './index.module.style';
import { IchatListType } from '../ChatConfig';
import { useEffect } from 'react';
import { isMobile } from '@/utils';
import services from '@/services/ai';
import {useModel, useResponsive} from '@umijs/max';

export const ChatSetModal = ({
  visible,
  onClose,
  onOk,
  configItem,
}: {
  visible: boolean;
  onOk: () => void;
  onClose: () => void;
  configItem: any;
}) => {
  const { styles } = useStyles();
  const [form] = Form.useForm<IchatListType>();
  const { modeList} = useModel('modes');
 const {mobile} = useResponsive()

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(configItem);
    }
  }, [visible]);

  return (
    <ModalForm<IchatListType>
      title="参数配置"
      width={800}
      form={form}
      open={visible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        },
		styles: {
			body: {
				padding: '0 8px',
				height: mobile ? 500 : 600,
				overflow: 'auto',
			}
		}
      }}
      onFinish={async (values) => {
        await services.ChatController.sessionUpdate({
          ...values,
          ...{
            id: configItem.id,
          },
        });
        onOk();
        message.success('提交成功');
        return true;
      }}
    >
	  <div style={{height: 20}}></div>
      <ProFormText
        width="md"
        name="title"
        label={<>名称</>}
        rules={[
          {
            required: true,
            message: '请输入名称',
          },
        ]}
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
        placeholder="请输入名称"
      />

      <ProFormSelect
        request={async () => modeList}
        width="xs"
        name="model"
        label="模型"
        rules={[
          {
            required: true,
            message: '请选择模型',
          },
        ]}
        fieldProps={{
          style: {
            width: '100%',
          },
        }}
      />

      <ProFormDigit
        label={<>单次最大Tokens </>}
		tooltip={
			<span className={styles.formItemDes}>设置为0默认最大</span>
		}
        name="maxToken"
        min={0}
        rules={[
          {
            required: true,
            message: '请选择单次最大Tokens',
          },
        ]}
      />

      <ProFormTextArea
        name="role"
		tooltip={
            <div className={styles.formItemDes}>选填，当前对话的系统角色预设</div>
		}
        label={
          <>
            角色预设
          </>
        }
        placeholder="请输入角色预设"
        fieldProps={{}}
      />

      <ProFormSlider
        name="random"
		tooltip={
            <div className={styles.formItemDes}>值越大，回复的内容越随机</div>
		}
        label={
          <>
            随机性
          </>
        }
        min={0}
        max={1}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择随机性',
          },
        ]}
        fieldProps={{}}
      />

      <ProFormSlider
        name="fresh"
		tooltip={
            <div className={styles.formItemDes}>值越大，扩展到新话题的可能性越大</div>
		}
        label={
          <>
            话题新鲜度
          </>
        }
        min={-2}
        max={2}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择话题新鲜度',
          },
        ]}
        fieldProps={{}}
      />

      <ProFormSlider
        name="repeat"
		tooltip={
            <div className={styles.formItemDes}>值越大，回复重复单词或短语的可能性越小</div>
		}
        label={
          <>
            重复度
          </>
        }
        min={-2}
        max={2}
        step={0.1}
        rules={[
          {
            required: true,
            message: '请选择重复度',
          },
        ]}
        fieldProps={{}}
      />

      <ProFormSlider
        name="context"
		tooltip={  <div className={styles.formItemDes}>
		值越大，上下文携带的条目数越多，为0则不会携带上下文
	  </div>}
        label={
          <>
            <div>上下文携带条目数</div>
          </>
        }
        min={0}
        max={10}
        step={1}
        rules={[
          {
            required: true,
            message: '请选择上下文携带条目数',
          },
        ]}
        fieldProps={{}}
      />
    </ModalForm>
  );
};
