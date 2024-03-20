import { Consume } from '@/components/Consume';
import { CusIcon } from '@/components/Icon';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Dropdown, Modal, Space, Tooltip, message, theme } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IDrawImgItem } from '../index';

export interface ISubmit {
  params?: {
    action: string;
    index?: string;
  };
  data: Partial<IDrawImgItem>;
}

type Info = Partial<
  IDrawImgItem & {
    promptEnStringList?: string[];
  }
>;

// 账号管理
export const MethodList = ({
  infoSource,
  onSubmit,
}: {
  infoSource: Partial<IDrawImgItem>;
  onSubmit: (data: ISubmit) => void;
}) => {
  const [info, setInfo] = useState<Info>({});
  const [promptVisible, setPromptVisible] = useState(false);
  const { modeDrawList } = useModel('modesDraw');
  const { token } = theme.useToken();

  useEffect(() => {
    let source: Info = cloneDeep(infoSource);
    source?.stateInfo?.methodList?.forEach?.((item) => {
      if (item.action === 'UPSCALE') {
        item?.opts?.forEach?.((it) => {
          (it.label = (
            <>
              {it.label}
              <Consume
                cost={
                  modeDrawList?.find((item) => item.value === 'BLEND')?.cost
                }
              ></Consume>
            </>
          )),
            (it.key = it.index);
        });
      }
      if (item.action === 'VARIATION') {
        item?.opts?.forEach?.((it) => {
          (it.label = (
            <>
              {it.label}
              <Consume
                cost={
                  modeDrawList?.find((item) => item.value === 'BLEND')?.cost
                }
              ></Consume>
            </>
          )),
            (it.key = it.index);
        });
      }
    });
    if (source?.stateInfo?.prompt !== undefined) {
      source.promptEnStringList = source?.stateInfo?.prompt?.split('\n\n');
    }
    setInfo(source);
  }, [infoSource]);

  const submit = async ({
    action,
    index,
  }: {
    action: string;
    index?: string;
  }) => {
    try {
      let params: any = {
        taskId: info.id,
        action,
        isPublic: 0,
      };
      if (index !== undefined) {
        params.index = index;
      }
      const data = await services.DrawController.taskSubmit(params);
      onSubmit({
        params,
        data,
      });
    } catch (error) {}
  };

  return (
    <div>
      {info?.stateInfo?.content ? (
        <Tooltip title={<>原图任务ID：{info.stateInfo.taskId}</>}>
          <ATag onClick={() => {}} color={token.colorPrimary}>
            {info?.stateInfo?.content}
          </ATag>
        </Tooltip>
      ) : (
        <></>
      )}
      {info?.stateInfo?.prompt ? (
        <ATag
          pointer
          onClick={() => {
            setPromptVisible(true);
          }}
          icon={<InfoCircleOutlined />}
          color={token.colorPrimary}
        >
          画面描述
        </ATag>
      ) : (
        <></>
      )}
      <Space>
        {info?.stateInfo?.methodList?.map?.((item: any, index: number) => {
          if (item.action === 'VARIATION') {
            return (
              <Dropdown
                key={index}
                menu={{
                  items: item.opts || [],
                  onClick: (e) => {
                    submit({
                      action: 'VARIATION',
                      index: e.key,
                    });
                  },
                }}
                placement="bottomLeft"
              >
                <ATag pointer>
                  <CusIcon icon="fa-solid fa-wand-magic-sparkles"></CusIcon>
                </ATag>
              </Dropdown>
            );
          }
          if (item.action === 'UPSCALE') {
            return (
              <Dropdown
                key={index}
                menu={{
                  items: item.opts || [],
                  onClick: (e) => {
                    submit({
                      action: 'UPSCALE',
                      index: e.key,
                    });
                  },
                }}
                placement="bottomLeft"
              >
                <ATag pointer>
                  <CusIcon icon="fa-solid fa-magnifying-glass"></CusIcon>
                </ATag>
              </Dropdown>
            );
          }
          if (item.action === 'REROLL') {
            return (
              <Tooltip
                key={index}
                title={
                  <>
                    重新生成
                    <Consume
                      cost={
                        modeDrawList?.find((item) => item.value === 'REROLL')
                          ?.cost
                      }
                    ></Consume>
                  </>
                }
              >
                <span>
                  <ATag
                    pointer
                    style={{ marginRight: 0 }}
                    onClick={() => {
                      submit({
                        action: 'REROLL',
                      });
                    }}
                  >
                    <CusIcon icon="fa-solid fa-rotate"></CusIcon>
                  </ATag>
                </span>
              </Tooltip>
            );
          }
        })}
      </Space>
      <Modal
        open={promptVisible}
        title="画面描述"
        footer={[]}
        onCancel={() => setPromptVisible(false)}
      >
        {info?.promptEnStringList?.map?.((item) => {
          return (
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <ATag pointer type="default">
                画面描述
              </ATag>
              <div>{item}</div>
              <CopyToClipboard
                text={item}
                onCopy={() => {
                  message.success('复制成功');
                }}
              >
                <ATag pointer type="default">
                  复制
                </ATag>
              </CopyToClipboard>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
