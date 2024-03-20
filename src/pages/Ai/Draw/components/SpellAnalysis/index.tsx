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

export const SpellAnalysis = ({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) => {
  const { styles } = useStyles();
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { modeDrawList } = useModel('modesDraw');
  const token = useTheme();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    getBase64(file as RcFile, (url) => {
      setImageUrl(url);
    });
    return false;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
          title={'咒语解析说明'}
          des={
            <>
              反解析您选择的图片提示词
            </>
          }
        ></Tip>

        <div className={styles.subTitle}>图片</div>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: imageUrl ? 'flex' : 'none',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, .6)',
              position: 'absolute',
              cursor: 'pointer',
              width: 105,
              height: 105,
            }}
          >
            <DeleteOutlined
              onClick={() => {
                setImageUrl('');
              }}
              style={{ color: token.colorTextTertiary }}
            ></DeleteOutlined>
          </div>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" className={styles.img} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>

      <div className={styles.bottom}>
        <Button
          type="primary"
          loading={loading}
          disabled={!imageUrl}
          onClick={async () => {
            try {
              setLoading(true);
              const data = await services.DrawController.taskSubmit({
                action: 'DESCRIBE',
                imageList: [imageUrl],
              });
              setImageUrl('');
              setLoading(false);
              onSubmit(data);
            } catch (error) {
              setLoading(false);
            }
          }}
        >
          解析图片咒语{' '}
          <Consume
            cost={modeDrawList?.find((item) => item.value === 'DESCRIBE')?.cost}
          ></Consume>
        </Button>
      </div>
    </div>
  );
};
