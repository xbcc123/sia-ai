import services from '@/services/ai';
import { Modal, Tag, message, theme } from 'antd';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ATag } from '../Tag/ATag';
import useStyles from './index.module.style';
import {getMiniImgUrl} from '@/utils';
import {useModel} from '@umijs/max';
import {isDiffPrompt} from '../../utils/index';

export const ImgModal = ({
  imgModalVisible,
  info,
  onClose,
}: {
  imgModalVisible: boolean;
  info: any;
  onClose: () => void;
}) => {
  const { styles } = useStyles();
  const [imgLoading, setImgLoading] = useState(false);
  const { initialState } = useModel("@@initialState")
  
  return (
    <Modal
      title="绘画详情"
      footer={[]}
      width={500}
      open={imgModalVisible}
      onCancel={() => onClose()}
    >
      <div className={styles.imgUrl}>
        <img
          style={{ width: '100%' }}
          src={getMiniImgUrl(info?.miniUrl, initialState?.setting?.domain)}
        ></img>
      </div>
      <div className={styles.imgBottom}>
        {info?.prompt && (
          <div style={{ marginTop: 8 }}>
            <ATag pointer type='default' style={{marginRight: 8}}>画面描述</ATag>
            <span>{info?.prompt}</span>
            <CopyToClipboard
              text={info?.prompt}
              onCopy={() => {
                message.success('复制成功');
              }}
            >
              <ATag pointer type="default" style={{ marginLeft: 8 }}>
                复制
              </ATag>
            </CopyToClipboard>
          </div>
        )}
		 
		  {info?.promptEn && !isDiffPrompt(info?.promptEn, info?.prompt) && (
          <div style={{ marginTop: 8 }}>
            <ATag pointer type='default' style={{marginRight: 8}}>翻译描述</ATag>
            <span>{info?.promptEn}</span>
            <CopyToClipboard
              text={info?.promptEn}
              onCopy={() => {
                message.success('复制成功');
              }}
            >
              <ATag pointer type="default" style={{ marginLeft: 8 }}>
                复制
              </ATag>
            </CopyToClipboard>
          </div>
        )}
        <div className={styles.flexBottom} style={{ cursor: 'pointer' }}>
          {!imgLoading ? (
            <ATag
              pointer
              type="default"
              onClick={async () => {
                try {
                  setImgLoading(true);
                  const base64Data = await services.CommonController.imageProxy(
                    {
                      url: info.imageUrl,
                    },
                  );
                  const newWindow: any = window.open();
                  newWindow.document.write(
                    `<img src="${base64Data}" style="width: 100vw; height: 100vh; object-fit: contain;" alt="Base64 Image">`,
                  );
                  setImgLoading(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              新窗口查看原图
            </ATag>
          ) : (
            <ATag pointer type="default">
              正在下载并打开图片...
            </ATag>
          )}
        </div>
      </div>
    </Modal>
  );
};
