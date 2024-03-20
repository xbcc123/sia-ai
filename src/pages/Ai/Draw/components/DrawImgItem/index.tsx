import { CusIcon } from '@/components/Icon';
import { ImgLoading } from '@/components/ImgLoading';
import { ImgModal } from '@/components/ImgModel';
import { MyIcon } from '@/components/MyIcon';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { getMiniImgUrl } from '@/utils';
import { SyncOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Popconfirm, Space, Tooltip, message } from 'antd';
import moment from 'moment';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ImgNo } from '../../../../../components/ImgNo/index';
import { ImgStatus } from './components/ImgStatus';
import { ISubmit, MethodList } from './components/MethodList';
import useStyles from './index.module.style';

export interface IDrawImgItem {
  id: string;
  email: string;
  action: string;
  prompt: string;
  promptEn: string;
  remixPrompt: null | any; // Replace 'any' with appropriate type
  description: string;
  state: string; // Replace with appropriate type
  submitTime: number;
  startTime: number;
  finishTime: number;
  imageUrl: string | null;
  status: string;
  progress: string;
  failReason: null | string;
  cost: number;
  back: number;
  isPublic: string;
  miniUrl: string | null;
  stateInfo: {
    taskId: '';
    content: '';
    prompt: '';
    methodList: Method[] | null;
  };
}

interface MethodOption {
  label: string | ReactNode;
  key: number;
  index: number;
}

interface Method {
  action: string;
  name: string;
  icon: string;
  opts: MethodOption[];
}

export const DrawImgItem = ({
  infoSource,
  onDelete,
  onChangeState,
  onSubmit,
}: {
  infoSource: Partial<IDrawImgItem>;
  onDelete: () => void;
  onChangeState: () => void;
  onSubmit: (data: ISubmit) => void;
}) => {
  const { initialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const [drawItem, setDrawItem] = useState({});
  const [downImgLoading, setDownImgLoading] = useState(false);
  const [info, setInfo] = useState<
    Partial<
      IDrawImgItem & {
        promptEnStringList?: string[];
      }
    >
  >({});
  const intervalIdRef = useRef<any>();

  useEffect(() => {
    setInfo(infoSource);
    if (infoSource?.status !== 'SUCCESS' && infoSource?.status !== 'FAILURE') {
      getStateToDone();
    }
  }, [infoSource]);

  //  改变状态
  const changeState = async (isPublic: number) => {
    try {
      await services.DrawController.publicChange({
        taskId: info.id,
        isPublic,
      });
      onChangeState();
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    };
  }, []);

  //  循环获取新状态知道状态成功或者失败
  const getStateToDone = () => {
    intervalIdRef.current = setInterval(async () => {
      const data = await getStatus();
      if (data.status === 'SUCCESS' || data.status === 'FAILURE') {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      setInfo(data);
    }, 3000);
  };

  //  获取最新状态
  const getStatus = async () => {
    try {
      const data = await services.DrawController.taskStatus({
        id: infoSource.id || '',
      });
      return data;
    } catch (error) {
      return {};
    }
  };

  // 图片
  const renderImg = () => {
    const statusMap: {
      [key: string]: ReactNode;
    } = {
      NOT_START: <ImgLoading></ImgLoading>,
      SUBMITTED: <ImgLoading></ImgLoading>,
      IN_PROGRESS: <ImgLoading></ImgLoading>,
      FAILURE: <ImgNo></ImgNo>,
      SUCCESS: (
        <img
          src={
            getMiniImgUrl(info?.miniUrl, initialState?.setting?.domain) || ''
          }
          onClick={() => {
            if (info.status === 'SUCCESS') {
              setDrawItem(info);
              setImgModalVisible(true);
            }
          }}
        ></img>
      ),
    };
    const node = statusMap?.[info?.status as any];
    return node || <ImgLoading></ImgLoading>;
  };

  //  是否公开
  const renderPublic = () => {
    if (info.status === 'NOT_START') {
      return;
    }
    return info?.isPublic === '0' ? (
      <Popconfirm
        title="是否确认切换任务公开状态？"
        onConfirm={() => changeState(1)}
        okText="确定"
        cancelText="取消"
      >
        <ATag pointer type="default">
          <MyIcon type="icon-yanjing_yincang"></MyIcon>
          私有
        </ATag>
      </Popconfirm>
    ) : (
      <Popconfirm
        title="是否确认切换任务私有状态？"
        onConfirm={() => changeState(0)}
        okText="确定"
        cancelText="取消"
      >
        <ATag pointer type="default">
          <MyIcon type="icon-yanjing_xianshi"></MyIcon>
          公开
        </ATag>
      </Popconfirm>
    );
  };

  const renderDownImg = () => {
    return !downImgLoading ? (
      <Tooltip title="下载原图">
        <span>
          <ATag
            pointer
            onClick={async () => {
              // 下载
              try {
                message.success('正在下载打开中，请稍后...');
                setDownImgLoading(true);
                const base64Data = await services.CommonController.imageProxy({
                  url: info.imageUrl,
                });
                setDownImgLoading(false);
                const newWindow: any = window.open();
                newWindow.document.write(
                  `<img src="${base64Data}" style="width: 100vw; height: 100vh; object-fit: contain;" alt="Base64 Image">`,
                );
              } catch (error) {}
            }}
          >
            <CusIcon icon="fa-solid fa-cloud-arrow-down" />
          </ATag>
        </span>
      </Tooltip>
    ) : (
      <ATag>
        <SyncOutlined spin />
      </ATag>
    );
  };

  return (
    <div className={styles.imgItem}>
      <div className={styles.imgWrap}>{renderImg()}</div>
      <div className={styles.bottom}>
        <div className={styles.hanld1}>
          <Space>
            <ImgStatus info={info}></ImgStatus>
            {renderPublic()}
          </Space>
          <Space>
            {info?.status !== 'SUCCESS' && (
              <Tooltip
                trigger={'hover'}
                title={
                  <>
                    <ATag pointer type="default">
                      画面描述
                    </ATag>
                    <div>{info?.description}</div>
                    <CopyToClipboard
                      text={info?.description}
                      onCopy={() => {
                        message.success('复制成功');
                      }}
                    >
                      <ATag pointer type="default">
                        复制
                      </ATag>
                    </CopyToClipboard>
                  </>
                }
              >
                <ATag>
                  <MyIcon
                    type="icon-icon_xiangguanmiaoshu"
                    style={{ marginRight: 2 }}
                  ></MyIcon>
                  描述
                </ATag>
              </Tooltip>
            )}
            {info?.status === 'SUCCESS' && renderDownImg()}
            {(info?.status === 'SUCCESS' || info?.status === 'FAILURE') && (
              <Popconfirm
                title="是否删除？"
                onConfirm={async () => {
                  // 删除
                  try {
                    await services.DrawController.taskDelete({ id: info?.id });
                    onDelete();
                  } catch (error) {}
                }}
                okText="确定"
                cancelText="取消"
              >
                <ATag pointer type="error">
                  <CusIcon icon="fa-solid fa-trash-can" />
                </ATag>
              </Popconfirm>
            )}
          </Space>
        </div>
        <div className={styles.hanld2}>
          <div className={styles.hanld2Time}>
            {moment(info?.submitTime).format('YYYY-MM-DD HH:mm:ss')}
          </div>
          <MethodList onSubmit={onSubmit} infoSource={info}></MethodList>
        </div>
      </div>

      <ImgModal
        imgModalVisible={imgModalVisible}
        info={drawItem}
        onClose={() => {
          setImgModalVisible(false);
        }}
      ></ImgModal>
    </div>
  );
};
