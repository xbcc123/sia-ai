import { Empty } from '@/components/Empty';
import { useEffect, useRef, useState } from 'react';
import { IchatListType } from '../Chat/components/ChatConfig/index';
import { AiToolsChatConfig } from './compoents/AiToolsChatConfig/index';
import AiToolsContent from './compoents/AiToolsContent';
import useStyles from './index.module.style';

export default () => {
  const { styles } = useStyles();
  const [list, setList] = useState<
    {
      id: number;
      name: string;
      des: string;
      key: string;
      icon: string;
      sort: number;
      appList: any[];
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [configItem, setConfigItem] = useState<Partial<IchatListType>>({});
  const [configEditItem, setConfigEditItem] = useState<Partial<IchatListType>>(
    {},
  );
  const [chatSetModalVisible, setChatSetModalVisible] = useState(false);
  const chatConfigRef = useRef<{
    getChatList: (val: (e: IchatListType[]) => void) => void;
    chatList: Partial<IchatListType>[];
  }>();

  useEffect(() => {
    getAppList();
  }, []);

  const getAppList = async () => {
    try {
      setLoading(true);
      // const data = await services.SenceController.MJ_BASE_PROMPT();
      setList([
        {
          id: 1,
          name: '文档',
          des: '',
          key: '1',
          icon: '',
          sort: 1,
          appList: [
            {
              name: '知识库',
              url: require('@/assets/images/chat-doc-img.png'),
            },
          ],
        },
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contanir}>
      <AiToolsChatConfig
        ref={chatConfigRef}
        onClickItem={function (val: any): void {
          setConfigItem(val);
        }}
        onOpenChatSetModal={(val) => {
          setConfigEditItem(val);
          setChatSetModalVisible(true);
        }}
      ></AiToolsChatConfig>

      {configItem?.id ? (
        <AiToolsContent info={configItem} key={configItem?.id}></AiToolsContent>
      ) : (
        <Empty text={'暂无内容～'}></Empty>
      )}
    </div>
  );
};
