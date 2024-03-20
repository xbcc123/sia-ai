import { MyIcon } from '@/components/MyIcon';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { exportChat } from '@/utils/chat';
import { chatQuotaCheck } from '@/utils/vali';
import { useModel, useTheme } from '@umijs/max';
import { FormInstance, Popconfirm, Skeleton } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { ChatContentList } from '../ChatContentList';
import { Question } from '../Question/Question';
import useStyles from './index.module.style';

export interface ImessageType {
  id: number | string;
  sessionId: number;
  model: string;
  aiText: string;
  userText: string;
  text: string;
  documents: Document[];
  finish: boolean;
  createTime: string;
  role: 'gpt' | 'user';
}

export type MessageType = 'chat' | 'chatDoc' | 'aiTools';

export const ChatContentListWrap = ({
  type = 'chat',
  configItem,
  textAreaProps,
  style,
}: {
  type: MessageType;
  configItem: any;
  style?: CSSProperties;
  textAreaProps?: TextAreaProps;
}) => {
  const { styles } = useStyles();
  const [messageList, setMessageList] = useState<Partial<ImessageType>[]>([]);
  const messageListRef = useRef<Partial<ImessageType>[]>([]);
  const messageCtrlRef = useRef<{ abort: any }>();
  const questionRef = useRef<{ form: FormInstance }>();
  const { generating, setGenerating } = useModel('chat');
  const [model, setModel] = useState('');
  const token = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === 'chat') {
      if (configItem?.id) {
        getChatMessageList(configItem);
      }
      if (configItem?.model) {
        setModel(configItem?.model);
      }
    }
    if (type === 'chatDoc') {
    }
  }, [configItem]);

  useEffect(() => {
    return () => {
      setGenerating(false);
    };
  }, []);

  const changeChatListRef = (data: any) => {
    messageListRef.current = data;
    setMessageList(data);
  };

  const getChatMessageList = async ({ id }: any) => {
    try {
        setLoading(true);
      const data = await services.ChatController.messageTopList({
        sessionId: id,
        limit: 100,
      });
      let list: any[] = [];
      data.forEach(
        ({ id, sessionId, model, aiText, userText, createTime }: any) => {
          if (userText) {
            list.push({
              id: `user:${id}`,
              sessionId,
              model,
              role: 'user',
              text: userText,
			  documents: [],
              createTime,
            });
          }
          list.push({
            id: `gpt:${id}`,
            sessionId,
            model,
            role: 'gpt',
            text: aiText,
			documents: [],
            createTime,
          });
        },
      );
      setLoading(false);
      changeChatListRef(list);
      intoViewLastChat(list.slice(-1)?.[0]?.id);
    } catch (error) {
      setLoading(false);
    }
  };

  const intoViewLastChaFn = (id: string) => {
    const targetElement = document.getElementById(`${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  const intoViewLastChatReq = (id: string) => {
    requestAnimationFrame(() => {
      intoViewLastChaFn(id);
    });
  };

  const intoViewLastChat = (id: string) => {
    setTimeout(() => {
      intoViewLastChaFn(id);
    }, 0);
  };

  const submit = async (values: any) => {
	
	const text = values?.submitText

	// 检测是否有套餐
    if (type === 'chat' && !(await chatQuotaCheck(configItem?.model || ''))) {
      return;
    }

    const newChatList = [...messageList];
    const id = Math.floor(Math.random() * 10000);
    const userId = `user:${id}`;
    const gptId = `gpt:${id}`;
    newChatList.push({
      id: userId,
      sessionId: configItem.id,
      model: configItem.model,
      text: text,
	  documents: [],
      role: 'user',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    newChatList.push({
      id: gptId,
      sessionId: configItem.id,
      model: configItem.model,
      text: '',
	  documents: [],
      role: 'gpt',
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    changeChatListRef(newChatList);
    intoViewLastChat(gptId);
    setGenerating(true);
    if (type === 'chatDoc') {
      let params = {
        stream: true,
        libraryId: configItem?.id,
        model: 'gpt-3.5-turbo-0613',
        query: text,
      };
      services.ChatController.completionsChatDoc(params, {
        cb: (data) => {
          const currentIndex = newChatList.findIndex(
            (item) => item.id === gptId,
          );
          let msg = newChatList[currentIndex].text;
          newChatList[currentIndex].text = `${msg}${data?.content || ''}`;
		  newChatList[currentIndex].finish = data.finish;
		  if(data?.documents?.length) {
			newChatList[currentIndex].documents = data.documents;
		  }
          changeChatListRef(cloneDeep(newChatList));
          intoViewLastChatReq(gptId);
        },
        ctrlCb: (ctrl) => {
          messageCtrlRef.current = ctrl;
        },
        end: () => {
          setGenerating(false);
        },
      });
    }
    if (type === 'chat') {
      services.ChatController.completions(
        { sessionId: configItem.id, text: text },
        {
          cb: (data) => {
            const currentIndex = newChatList.findIndex(
              (item) => item.id === gptId,
            );
            let msg = newChatList[currentIndex].text;
            newChatList[currentIndex].text = `${msg}${data}`;
            changeChatListRef(cloneDeep(newChatList));
            intoViewLastChatReq(gptId);
          },
          ctrlCb: (ctrl) => {
            messageCtrlRef.current = ctrl;
          },
          end: () => {
            setGenerating(false);
          },
        },
      );
    }
  };

  return (
    <div className={styles.contanir} style={style}>
      <div className={styles.menus}>
        <div className={styles.menusLeft}>{configItem.title}</div>
        <div className={styles.menusRight}>
          <Popconfirm
            title="确定导出吗？"
            onConfirm={() => {
              exportChat(configItem);
            }}
            okText="确定"
            cancelText="取消"
          >
            <ATag pointer style={{ display: 'flex' }}>
              <MyIcon
                style={{ fontSize: token.fontSizeLG, marginRight: 4 }}
                type="icon-daochu"
              ></MyIcon>{' '}
              导出
            </ATag>
          </Popconfirm>
        </div>
      </div>
	  
      <div style={{ marginTop: 8, marginBottom: 8 }}></div>

      <div className={styles.contentListWrap}>
        {loading ? <Skeleton avatar active paragraph={{ rows: 2 }} />:   <ChatContentList
          style={{ flex: 1 }}
          key={configItem.id}
          messageCtrlRef={messageCtrlRef}
          messageList={messageList}
          onRefMessage={(item: any) => {
            submit(item.text);
          }}
          onEditMessage={(item: any) => {
            questionRef?.current?.form?.setFieldsValue({
              submitText: item.text,
            });
          }}
          onDeleteMessage={async (item: any) => {
            messageList.splice(
              messageList.findLastIndex(
                (messageItem) => messageItem.id === item.id,
              ) - 1,
              2,
            );
            const id = item.id.split(':')?.[1];
            setMessageList(cloneDeep(messageList));
            try {
              await services.ChatController.messageDelete({ id });
            } catch (error) {}
          }}
        ></ChatContentList>}

        <Question
          type={type}
          ref={questionRef}
          messageCtrlRef={messageCtrlRef}
          configItem={configItem}
          generating={generating}
          model={model}
          setModel={setModel}
          submit={submit}
          changeChatListRef={changeChatListRef}
          textAreaProps={textAreaProps}
        ></Question>
      </div>
    </div>
  );
};
