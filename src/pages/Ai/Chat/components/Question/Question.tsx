import { MyIcon } from '@/components/MyIcon';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { getModeFormModeList } from '@/utils/format';
import { BellOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import { useModel, useResponsive } from '@umijs/max';
import {
  Button,
  Dropdown,
  Form,
  Input,
  Popconfirm,
  Upload,
  message,
} from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { MessageType } from '../ChatContentListWrap/index';
import useStyles from './Question.module.style';

export const Question = forwardRef(
  (
    {
      type,
      configItem,
      generating,
      model,
      messageCtrlRef,
      textAreaProps,
      setModel,
      changeChatListRef,
      submit,
    }: {
      type: MessageType;
      configItem: any;
      generating: boolean;
      model: string;
      messageCtrlRef: any;
      textAreaProps?: TextAreaProps;
      setModel: (val: any) => void;
      submit: (val: any) => void;
      changeChatListRef: (val: any[]) => void;
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      form,
    }));
    const { styles } = useStyles();
    const [form] = Form.useForm();
    const { modeList } = useModel('modes');
    const { mobile } = useResponsive();
    const { setGenerating } = useModel('chat');
    const isComposition = useRef(false);
    const [submitTextKey, setNubmitTextKey] = useState<number>(0);

    const handlePressEnter = (event: any) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        // 处理回车键
        if (!isComposition.current) {
          form.submit();
        }
      }
    };

    const handleComposition = (ev: any) => {
      if (ev.type === 'compositionend') {
        isComposition.current = false;
      } else {
        isComposition.current = true;
      }
    };

    const hanldSubmit = (values: any) => {
      submit(values);
      setNubmitTextKey(Math.random());
      form.setFieldsValue({
        submitText: null,
      });
    };

    // 渲染改变模型
    const renderChangeModel = () => {
      return type === 'chat' ? (
        <div
          style={{
            display: 'flex',
          }}
        >
          <Dropdown
            menu={{
              items: modeList,
              selectedKeys: [model],
              onClick: async (e) => {
                await services.ChatController.sessionUpdate({
                  ...configItem,
                  ...{
                    id: configItem.id,
                    model: e.key,
                  },
                });
                message.success(
                  `模型切换为${getModeFormModeList(modeList, e.key)?.name}`,
                );
                setModel(e.key);
              },
            }}
          >
            <ATag pointer type="default">
              <BellOutlined style={{ marginRight: 4 }} />
              {getModeFormModeList(modeList, model)?.name}
            </ATag>
          </Dropdown>
        </div>
      ) : (
        <div></div>
      );
    };

    // 暂时停止生成
    const renderStop = () => {
      return (
        generating && (
          <div
            className={styles.stopMessage}
            onClick={() => {
              if (messageCtrlRef?.current) {
                messageCtrlRef?.current?.abort?.();
                setGenerating(false);
              }
            }}
          >
            <MyIcon type="icon-stopcircle" style={{ marginRight: 4 }}></MyIcon>
            停止
          </div>
        )
      );
    };

    // 清空对话
    const renderClearAll = () => {
      return (
        type === 'chat' && (
          <Popconfirm
            title="确定清空对话吗？"
            onConfirm={async () => {
              changeChatListRef([]);
              try {
                await services.ChatController.sessionClear({
                  id: configItem.id,
                });
              } catch (error) {}
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <ATag pointer>
              <MyIcon type="icon-qingkong" style={{ marginRight: 4 }}></MyIcon>
              清空对话
            </ATag>
          </Popconfirm>
        )
      );
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>
          选择图片
        </div>
      </div>
    );

    return (
      <div className={styles.question}>
        <Form
          form={form}
          onFinish={(values) => {
            hanldSubmit(values);
          }}
        >
          <div className={styles.questionTools}>
            {renderChangeModel()}
            {renderStop()}
            <div className={styles.questionClear}>{renderClearAll()}</div>
          </div>

          <div
            className={styles.bottom}
            style={{ display: 'flex', width: '100%' }}
          >
            <Form.Item noStyle name={'submitText'}>
              {mobile ? (
                <Input
                  style={{ marginRight: 8 }}
                  size="large"
                  key={submitTextKey}
                  placeholder="输入消息内容"
                  maxLength={1000}
                />
              ) : (
                <Input.TextArea
                  style={{ flex: 1, marginRight: 8 }}
                  key={submitTextKey}
                  onCompositionStart={handleComposition}
                  onCompositionEnd={handleComposition}
                  onPressEnter={handlePressEnter}
                  placeholder="输入消息内容（Enter触发搜索）"
                  autoSize={{ minRows: 4, maxRows: 12 }}
                  {...textAreaProps}
                />
              )}
            </Form.Item>
            <Form.Item noStyle>
              <Button disabled={generating} type="primary" htmlType="submit">
                <SendOutlined />
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  },
);
