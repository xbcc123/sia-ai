import { CusIcon } from '@/components/Icon';
import { MSlider } from '@/components/MSlider/index';
import services from '@/services/ai';
import { isLogin } from '@/utils';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Popconfirm } from 'antd';
import {  useTheme } from 'antd-style';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import useStyles from './index.module.style';
import { useLocation } from '@umijs/max';
import { IAppItem } from '@/pages/Ai/AppContent/types';
import {isMobile} from '@/utils/index';

export interface IchatListType {
  id: number;
  title: string;
  model: string;
  maxToken: number;
  role: string | null;
  random: number;
  fresh: number;
  repeat: number;
  context: number;
  updateTime: string;
}

export const ChatConfig = forwardRef(
  (
    {
      onClickItem,
      onOpenChatSetModal,
    }: {
      onClickItem: (val: any) => void;
      onOpenChatSetModal: (val: IchatListType) => void;
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      chatList,
      getChatList,
    }));

    const { styles } = useStyles();
    const [searValue, setSearValue] = useState('');
    const [chatList, setChatList] = useState<Partial<IchatListType>[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const token = useTheme();
    // const { mobile } = useResponsive();
	const location = useLocation()

	useEffect(() => {
		if(location.state) {
			chatFromApp(location.state as IAppItem)
		}
	}, [location])

	const chatFromApp = async ({id: appId}: IAppItem) => {
		try {
		  await services.ChatController.sessionCreate({
			appId
		  });
		  getChatList((data) => {
			if (data[0]) {
			  onClickChecked(data, data?.[0]);
			}
		  });
		} catch (error) {
			
		}
	}

    useEffect(() => {
      getChatList((data) => {
        if (data[0]) {
          onClickChecked(data, data?.[0]);
        }
      });
    }, []);

    // 获取数据
    const getChatList = async (cb: (val: IchatListType[]) => void) => {
      if (!isLogin()) {
        return;
      }
      try {
        const data = await services.ChatController.sessionList();
        setChatList(data);
        cb(data);
      } catch (error) {}
    };

    // 点击列表
    const onClickChecked = (
      data: Partial<IchatListType>[],
      item: IchatListType,
    ) => {
      setCurrentIndex(data.findIndex((menuItem) => menuItem.id === item.id));
      onClickItem(item);
    };

    // 操作按钮
    const renderDropdown = (item: any) => {
      return (
        <Dropdown
		  trigger={['click']}
          menu={{
            items: [
				{
					key: '1',
					label: (
					  <span
						onClick={async () => {
							onOpenChatSetModal(item);
						}}
					  >
						对话配置
					  </span>
					),
				  },
              {
                key: '2',
                label: (
                  <span
                    onClick={async () => {
                      try {
                        await services.ChatController.sessionPinned({
                          id: item.id,
                          isPinned: item.isPinned === 0 ? 1 : 0,
                        });
                        getChatList((data) => {
                          onClickChecked(data, data?.[0]);
                        });
                      } catch (error) {}
                    }}
                  >
                    {item.isPinned === 0 ? "置顶对话" : "取消置顶"}
                  </span>
                ),
              },
              {
                key: '3',
                label: (
                  <Popconfirm
                    title="确定删除对话吗？"
                    onConfirm={async () => {
                      try {
                        await services.ChatController.sessionDelete({
                          id: item.id,
                        });
                        getChatList((data) => {
                          onClickChecked(data, data?.[0]);
                        });
                      } catch (error) {}
                    }}
                    onCancel={() => {}}
                    okText="确定"
                    cancelText="取消"
                  >
                    {' '}
                    删除对话
                  </Popconfirm>
                ),
              },
            ],
          }}
        >
          <span>
            <CusIcon icon={'fa-solid fa-ellipsis'}></CusIcon>
          </span>
        </Dropdown>
      );
    };

    const list = chatList?.filter?.((item) => item.title?.includes(searValue));
	
    return (
      <MSlider
	    defCollapsed={!isMobile()}
        width={240}
        bodyStyle={{ padding: 16 }}
      >
        <div className={styles.container}>
			<InputHanld searValue={searValue} setSearValue={setSearValue} getChatList={getChatList} onClickChecked={onClickChecked}></InputHanld>
          {list?.length > 0 ? (
            <div className={styles.chatList}>
              {list?.map?.((item: any, index) => {
                return (
                  <div
                    key={item?.id}
					onClick={() => {
                        onClickChecked(chatList, item);
                    }}
                    className={`${styles.chatItem} 
					${index === currentIndex ? styles.chatItemActive : ''} ${item.isPinned === 1 ? styles.isPinned : ""}`}
                  >
                    <div
                      className={styles.chatItemLeft}
                 
                    >
                      <div className="singleLine" style={{ maxWidth: 150 }}>
					  {
						item.isPinned === 1 && <CusIcon style={{
							fontSize: 12,
							transform: 'rotate(45deg)',
							marginRight: 8,
							marginTop: 2,
							display: 'inline-block'
						}} icon="fa-solid fa-thumbtack" />
					}
                        {item.title}
                      </div>
                      {/* <div className={styles.upDateTime}>{item.updateTime}</div> */}
                    </div>
                    <div className={`${styles.chatItemRight}`}>
                      {/* <div
                        onClick={() => {
                          onOpenChatSetModal(item);
                        }}
                      >
                        <EditOutlined className={styles.icon} />
                      </div> */}
                      <div style={{ paddingLeft: 12, paddingRight: 8 }}>
                        {renderDropdown(item)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                marginTop: 40,
                textAlign: 'center',
                fontSize: 12,
                color: token?.colorTextDescription,
              }}
            >
              暂无对话 ~
            </div>
          )}
        </div>
      </MSlider>
    );
  },
);

// 操作按钮
const InputHanld = ({getChatList, onClickChecked, searValue, setSearValue}: {
	getChatList: (val: (data: any[]) =>void) => void, 
	onClickChecked: (data: any[], dataIttem: any) => void,
	searValue: string, 
	setSearValue: (val: string) => void
}) => {
	const { styles } = useStyles();

	return  <div className={styles.inputWrap}>
	<Input
	  allowClear
	  prefix={<SearchOutlined />}
	  placeholder="请输入对话搜索"
	  value={searValue}
	  style={{ flex: 1, marginRight: 8 }}
	  onChange={(e) => {
		setSearValue(e.target.value);
	  }}
	/>
	<Button
	  onClick={async () => {
		try {
		  await services.ChatController.sessionCreate();
		  getChatList((data: any[]) => {
			if (data[0]) {
			  onClickChecked(data, data?.[0]);
			}
		  });
		} catch (error) {}
	  }}
	>
	  +
	</Button>
  </div>
}