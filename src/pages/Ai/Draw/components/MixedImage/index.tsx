import { Consume } from '@/components/Consume';
import { Tip } from '@/components/Tip';
import services from '@/services/ai';
import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Upload } from 'antd';
import { useTheme } from 'antd-style';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import useStyles from './index.module.style';

const initValues = [
    {
      url: '',
    },
    {
      url: '',
    },
  ]
export const MixedImage = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);
  const { modeDrawList } = useModel('modesDraw');
  const [fileList, setFileList] = useState(initValues);
  const token = useTheme();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{ marginTop: 8, color: token.colorTextTertiary, fontSize: 12 }}
      >
        选择图片
      </div>
    </div>
  );

  return (
    <div className={styles.contanir}>
      <div className={styles.content}>
        <Tip
          title={'混图说明'}
          des={<>可以将图像融合，请上传2~5张图片</>}
        ></Tip>

        {fileList?.map?.((item, index) => {
          return (
            <div key={index}>
              <div className={styles.subTitle}>
                图片{index + 1}{' '}
				{
					fileList?.length > 2 && <span
					style={{
					  marginLeft: 4,
					  cursor: 'pointer',
					  fontSize: 12,
					  color: token?.colorTextDescription,
					}}
					onClick={() => {
					  fileList.splice(index, 1);
					  setFileList([...fileList]);
					}}
				  >
					删除
				  </span>
				}
              </div>
              <div style={{ position: 'relative' }}>
                <div
                  className={styles.imgContent}
                  style={{
                    display: item.url ? 'flex' : 'none',
                  }}
                >
                  <DeleteOutlined
                    onClick={() => {
                      fileList[index].url = '';
                      setFileList([...fileList]);
                    }}
                    style={{ color: token.colorBgBase }}
                  ></DeleteOutlined>
                </div>
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  beforeUpload={(file) => {
                    getBase64(file as RcFile, (url) => {
					  fileList[index].url = url
                      setFileList([...fileList]);
                    });
                    return false;
                  }}
                >
                  {item.url ? (
                    <img src={item.url} alt="avatar" className={styles.img} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
          );
        })}

        {fileList?.length < 5 && (
          <>
            <Button
              onClick={() => {
                fileList.push({
                  url: '',
                });
                setFileList([...fileList]);
              }}
            >
              增加图片
            </Button>
          </>
        )}
      </div>

      <div className={styles.bottom}>
        <Button
          type="primary"
          disabled={fileList?.filter?.(item => item.url)?.length < 2}
		  loading={loading}
          onClick={async () => {
            try {
              setLoading(true);
              const data = await services.DrawController.taskSubmit({
                action: 'BLEND',
                imageList: fileList?.filter?.(item => item.url)?.map?.(item => item.url)
              });
			  setFileList(initValues)
              setLoading(false);
              onSubmit(data);
            } catch (error) {
              setLoading(false);
            }
          }}
        >
          立即混合图片{' '}
          <Consume
            cost={modeDrawList?.find((item) => item.value === 'BLEND')?.cost}
          ></Consume>
        </Button>
      </div>
    </div>
  );
};
