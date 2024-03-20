import {
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Upload, UploadProps, message } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useState } from 'react';

const useStyles = createStyles(({ token }) => {
  return {
    referenceDrawings: {
      display: 'flex',
    },
    avatarUploader: {
      width: 'initial',
    },
    img: {
      width: 100,
      height: 100,
      objectFit: 'cover',
    },
  };
});

export const ReferenceDrawings = ({
  value,
  onChange,
}: {
  value?: any[];
  onChange?: (value: any[]) => void;
}) => {
  const { styles } = useStyles();
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageUrl2, setImageUrl2] = useState<string>();
  const [loading, setLoading] = useState(false);
  const token = useTheme()

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
	getBase64(file as RcFile, (url) => {
        setImageUrl(url);
        onChange?.([url, imageUrl2]);
      });
	return false
  };

  const beforeUpload2 = (file: RcFile) => {
	getBase64(file as RcFile, (url) => {
        setImageUrl2(url);
        onChange?.([imageUrl, url]);
      });
	return false
  };

//   const handleChange: UploadProps['onChange'] = (
//     info: UploadChangeParam<UploadFile>,
//   ) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj as RcFile, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//         onChange?.([url, imageUrl2]);
//       });
//     }
//   };

//   const handleChange2: UploadProps['onChange'] = (
//     info: UploadChangeParam<UploadFile>,
//   ) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj as RcFile, (url) => {
//         setLoading(false);
//         setImageUrl2(url);
//         onChange?.([imageUrl, url]);
//       });
//     }
//   };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize: 12, color: token.colorTextTertiary }}>
        参考图1(可选)
      </div>
    </div>
  );

  const uploadButton1 = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize: 12, color: token.colorTextTertiary }}>
        参考图2(可选)
      </div>
    </div>
  );
  return (
    <div className={styles.referenceDrawings}>
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
            style={{ color: token.colorTextBase }}
          ></DeleteOutlined>
        </div>
        <Upload
          listType="picture-card"
          className={styles.avatarUploader}
          showUploadList={false}
          beforeUpload={beforeUpload}
        //   onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" className={styles.img} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: imageUrl2 ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, .6)',
            position: 'absolute',
            cursor: 'pointer',
            width: 100,
            height: 100,
          }}
        >
          <DeleteOutlined
            onClick={() => {
              setImageUrl2('');
            }}
            style={{ color: token.colorTextBase }}
          ></DeleteOutlined>
        </div>
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload2}
        //   onChange={handleChange2}
        >
          {imageUrl2 ? (
            <img src={imageUrl2} alt="avatar" className={styles.img} />
          ) : (
            uploadButton1
          )}
        </Upload>
      </div>
    </div>
  );
};
