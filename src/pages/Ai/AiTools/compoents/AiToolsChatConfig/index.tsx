import { CusIcon } from '@/components/Icon';
import { MSlider } from '@/components/MSlider/index';
import services from '@/services/ai';
import { isLogin } from '@/utils';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Button, Divider, Dropdown, Input, Popconfirm } from 'antd';
import { useResponsive, useTheme } from 'antd-style';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AppModal } from '../AppModal/index';
import useStyles from './index.module.style';
import {isMobile} from '../../../../../utils/index';

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

export const AiToolsChatConfig = forwardRef(
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
    const [appModalOpen, setAppModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const token = useTheme();
    const { mobile } = useResponsive();

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
        const data = await services.AiToolsController.toolAppList();
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

    const list = chatList?.filter?.((item) => item.title?.includes(searValue));

    return (
      <>
        <MSlider
          defCollapsed={!isMobile()}
          width={240}
          bodyStyle={{ padding: 16}}
        >
          <div className={styles.container}>
            <InputHanld
              addClick={() => {
                setAppModalOpen(true);
              }}
              searValue={searValue}
              setSearValue={setSearValue}
              getChatList={getChatList}
              onClickChecked={onClickChecked}
            ></InputHanld>

            {list?.length > 0 ? (
              <div className={styles.chatList}>
                {list?.map?.((item: any, index) => {
                  return (
                    <div
                      key={item?.id}
                      className={`${styles.chatItem} 
					${index === currentIndex ? styles.chatItemActive : ''}`}
                    >
                      <div
                        className={styles.chatItemLeft}
                        onClick={() => {
                          onClickChecked(chatList, item);
                        }}
                      >
                        <div className="singleLine" style={{ maxWidth: 160 }}>
                          {item.title}
                        </div>
                        <div className={`${styles.upDateTime} singleLine`}>
                          {item.remark}
                        </div>
                      </div>
                      <div className={`${styles.chatItemRight}`}>
                        {/* <div
                          onClick={() => {
                            onOpenChatSetModal(item);
                          }}
                        >
                          <EditOutlined className={styles.icon} />
                        </div> */}
                        <div style={{ marginLeft: 16 }}>
                          {/* {renderDropdown(item)} */}
                          <Popconfirm
                            title="确定删除吗？"
                            onConfirm={async () => {
                              try {
                                await services.AiToolsController.toolDelete({
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
							<DeleteOutlined className={styles.icon} />
                          </Popconfirm>
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
                暂无应用 ~
              </div>
            )}
          </div>
          <Divider></Divider>
          <div
            className={`${styles.chatItem}`}
            onClick={() => {
              if (
                !JSON.parse(localStorage.getItem('userInfo') || '{}')?.apiKey
              ) {
                return;
              }
              localStorage.setItem('lastMenusKey', '6');
              navigate('/ai/tools/chat-doc');
            }}
          >
            <div className={styles.chatItemLeft}>
              <div className="singleLine">知识库管理</div>
              <div className={`${styles.upDateTime} singleLine`}>
                自定义垂直聊天机器人、知识库
              </div>
            </div>
          </div>
        </MSlider>
        <AppModal
          open={appModalOpen}
          onCancel={function (): void {
            setAppModalOpen(false);
          }}
          onClicked={() => {
            getChatList((data) => {
              if (data[0]) {
                onClickChecked(data, data?.[0]);
              }
            });
          }}
        ></AppModal>
      </>
    );
  },
);

// 操作按钮
const InputHanld = ({
  getChatList,
  onClickChecked,
  searValue,
  setSearValue,
  addClick,
}: {
  getChatList: (val: (data: any[]) => void) => void;
  onClickChecked: (data: any[], dataIttem: any) => void;
  searValue: string;
  setSearValue: (val: string) => void;
  addClick: () => void;
}) => {
  const { styles } = useStyles();

  return (
    <div className={styles.inputWrap}>
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="请输入工具名搜索"
        value={searValue}
        style={{ flex: 1, marginRight: 8 }}
        onChange={(e) => {
          setSearValue(e.target.value);
        }}
      />
      <Button
        onClick={addClick}
        //   onClick={async () => {
        // 	try {
        // 	  await services.ChatController.sessionCreate();
        // 	  getChatList((data: any[]) => {
        // 		if (data[0]) {
        // 		  onClickChecked(data, data?.[0]);
        // 		}
        // 	  });
        // 	} catch (error) {}
        //   }}
      >
        +
      </Button>
    </div>
  );
};
