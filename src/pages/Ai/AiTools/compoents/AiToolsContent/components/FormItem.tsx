import {uploadButton, uploadSingleBase64Props} from '@/utils/upload';
import {Form, Upload} from 'antd';

export const ImgFormItem = () => {
	return  <Form.Item
	name={'imageBase64'}
	valuePropName="fileList"
	getValueFromEvent={(e: any) => {
	  if (Array.isArray(e)) {
		return e;
	  }
	  return e?.fileList;
	}}
  >
	<Upload {...uploadSingleBase64Props}>{uploadButton}</Upload>
  </Form.Item>
}