import '@/assets/css/ball-beat.css';
import { CSSProperties } from 'react';
import { ImessageType } from '../ChatContentListWrap/index';
import useStyles from './index.module.style';
import { ChatContentItem } from '../ChatContentItem/ChatContentItem';
import { Empty } from '@/components/Empty';

export const ChatContentList = ({
  style,
  messageList,
  messageCtrlRef,
  onDeleteMessage,
  onRefMessage,
  onEditMessage,
}: {
  messageList: Partial<ImessageType>[];
  style: CSSProperties;
  messageCtrlRef: any;
  onDeleteMessage: (item: any) => void;
  onRefMessage?: (val: any) => void;
  onEditMessage?: (val: any) => void;
}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.contanir} style={style}>
      <div className={styles.chat}  id="exportMessageList">
        {messageList?.length > 0 ?
          messageList.map((item, index) => {
            return (
              <ChatContentItem
                showTools={true}
                messageCtrlRef={messageCtrlRef}
                messageList={messageList}
                onDeleteMessage={onDeleteMessage}
                onRefMessage={onRefMessage}
				onEditMessage={onEditMessage}
                item={item}
                key={index}
              ></ChatContentItem>
            )
          }): <Empty style={{marginTop: '10%'}} text={'暂无对话'}></Empty>
        }
      </div>
    </div>
  );
};
