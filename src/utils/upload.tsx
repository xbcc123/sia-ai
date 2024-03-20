import servicesMain from '@/services/main';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';

export const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8, color: '#888', fontSize: 12 }}>选择图片</div>
  </div>
);

export const customRequest = async (option: any) => {
  const file = option.file as File;
  try {
    // 使用第三方服务进行文件上传
    const formData = new FormData();
    formData.append('file', file);
    const result = await servicesMain.CommonController.upload(
      'images',
      formData,
    );
    // onSuccess的回调参数可以在 UploadFile.response 中获取
    option.onSuccess(result);
  } catch (error) {
    option.onError(error);
  }
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
  };

export const customRequestBase64 = (option: any) => {
	getBase64(option.file as RcFile, (url) => {
		option.onSuccess(url);
      });
}

const singleProps = {
	listType: 'picture-card',
	maxCount: 1,
}

export const uploadSingleProps = {
  customRequest,
  showUploadList: {
	showRemoveIcon: false,
  },
 ...singleProps
};

export const uploadSingleBase64Props = {
	customRequest: customRequestBase64,
  ...singleProps
};
