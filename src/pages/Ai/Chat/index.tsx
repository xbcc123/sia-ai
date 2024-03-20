import { useRef, useState } from 'react';
import { ChatConfig } from './components/ChatConfig';
import { IchatListType } from './components/ChatConfig/index';
import { ChatContentListWrap } from './components/ChatContentListWrap';
import { ChatSetModal } from './components/ChatSetModal/index';
import useStyles from './index.module.style';
import { Empty } from '@/components/Empty';

export default () => {
  const { styles } = useStyles();
  const [configItem, setConfigItem] = useState<Partial<IchatListType>>({});
  const [configEditItem, setConfigEditItem] = useState<Partial<IchatListType>>(
    {},
  );
  const [chatSetModalVisible, setChatSetModalVisible] = useState(false);
  const chatConfigRef = useRef<{
    getChatList: (val: (e: IchatListType[]) => void) => void;
    chatList: Partial<IchatListType>[];
  }>();

  return (
    <div className={styles.contanir}>
      <ChatConfig
        ref={chatConfigRef}
        onClickItem={function (val: any): void {
          setConfigItem(val);
        }}
        onOpenChatSetModal={(val) => {
          setConfigEditItem(val);
          setChatSetModalVisible(true);
        }}
      ></ChatConfig>

      {configItem?.id ? (
        <ChatContentListWrap
		  type='chat'
          configItem={configItem}
          key={configItem.id}
        ></ChatContentListWrap>
      ) : (
		<Empty text={'您还没有创建过对话～'}></Empty>
      )}

      {/* 设置弹窗 */}
      <ChatSetModal
        visible={chatSetModalVisible}
        configItem={configEditItem}
        onOk={() => {
          setChatSetModalVisible(false);
          chatConfigRef.current?.getChatList((e) => {
            // 如果当前编辑的 等于 当前选中的刷新右边对话数据
            if (configEditItem.id === configItem.id) {
              setConfigItem(e.find((item) => item.id === configItem.id) || {});
            }
          });
        }}
        onClose={function (): void {
          setChatSetModalVisible(false);
        }}
      ></ChatSetModal>
    </div>
  );
};
