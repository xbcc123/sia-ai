import { CusIcon } from '@/components/Icon';
import { MarkdownRenderer, MessageRender } from '@/components/MarkDown/index';
import {
  DeleteOutlined,
  FieldTimeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useModel, useResponsive } from '@umijs/max';
import { Avatar, Popconfirm, Tooltip, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useStyles from './ChatContentItem.module.style';

export const ChatContentItem = ({
  item,
  showTools,
  messageList,
  messageCtrlRef,
  onDeleteMessage,
  onRefMessage,
  onEditMessage,
}: {
  item: any;
  messageList: any[];
  messageCtrlRef: any;
  onDeleteMessage?: (item?: any) => void;
  onRefMessage?: (val: any) => void;
  onEditMessage?: (val: any) => void;
  showTools: boolean;
}) => {
  const { styles } = useStyles();
  const { generating, setGenerating } = useModel('chat');
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const { mobile, } = useResponsive();
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;

  const maxWidth = mobile
    ? window.outerWidth - 32 * window.devicePixelRatio
    : 800;

  
	const renderHanld = () => {
		return <>
		 <span style={{ cursor: 'pointer', marginRight: 8 }}>
          <CopyToClipboard
            text={item.text}
            onCopy={() => {
              message.success('复制成功');
            }}
          >
            <Tooltip title={!mobile && "复制"}>
              <span>
                <CusIcon
                  icon={'fa-regular fa-copy'}
                ></CusIcon>
              </span>
            </Tooltip>
          </CopyToClipboard>
        </span>
        {item.role === 'user' && !generating && (
          <span
            style={{ cursor: 'pointer', marginRight: 8 }}
            onClick={() => {
              onRefMessage?.(item);
            }}
          >
            <Tooltip title={!mobile && "重新生成"}>
              <span>
                <CusIcon
                  icon="fa-solid fa-rotate-right"
                ></CusIcon>
              </span>
            </Tooltip>
          </span>
        )}
        {item.role === 'user' && !generating && (
          <span
            style={{ cursor: 'pointer', marginRight: 8 }}
            onClick={() => {
              onEditMessage?.(item);
            }}
          >
            <Tooltip title={ !mobile && "编辑"}>
              <span>
                <CusIcon
                  icon="fa-regular fa-pen-to-square"
                ></CusIcon>
              </span>
            </Tooltip>
          </span>
        )}
        {item.role === 'gpt' && item.model && !generating && (
          <span style={{ cursor: 'pointer', marginRight: 8 }}>
            <Popconfirm
              title="确定删除对话吗？"
              onConfirm={async () => {
                onDeleteMessage?.(item);
              }}
              onCancel={() => {}}
              okText="确定"
              cancelText="取消"
            >
			  <Tooltip title={ !mobile && "删除"}>
				<span>
					<DeleteOutlined  />
				</span>
			  </Tooltip>
            </Popconfirm>
          </span>
        )}
		</>
	}

  const renderTools = () => {
    return (
      <>
        {' '}
        <span style={{ marginRight: 8 }}>
          <FieldTimeOutlined style={{ marginRight: 4 }} />
          {item.createTime}
        </span>
        {item.model && (
          <span style={{ marginRight: 8 }}>
            <SettingOutlined style={{ marginRight: 4 }} />
            {item.model}
          </span>
        )}
       {renderHanld()}
      </>
    );
  };

  const renderAvatar = () => {
    return (
      !mobile && (
        <div className={styles.chatItemAva}>
          {item.role === 'user' && (
            <Avatar
              size={32}
              src={`${setting?.domain}${userInfo?.avatar}`}
            />
          )}
          {item.role === 'gpt' && (
            <Avatar size={32} src={`${setting?.domain}${setting?.logo}`} />
          )}
        </div>
      )
    );
  };

  return (
    <div
      id={item.id}
      className={`${styles.chatItem} ${
        item.role === 'gpt' ? styles.chatItemGpt : ''
      }`}
    >
      {renderAvatar()}
      <div className={styles.chatItemContent}>
        <div
          className={styles.chatItemTxt}
          style={{
            maxWidth,
          }}
        >
          {item.text ? (<MessageRender item={item} key={item.text.length}></MessageRender>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="la-ball-beat la-dark la-sm">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div style={{ visibility: 'hidden' }}>加载中</div>
            </div>
          )}
        </div>
        <div className={styles.chatItemTools}>{showTools && renderTools()}</div>
      </div>
    </div>
  );
};
