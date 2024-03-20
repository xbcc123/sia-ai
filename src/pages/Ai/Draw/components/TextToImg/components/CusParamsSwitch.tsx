import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Tooltip } from 'antd';

export const CusParamsSwitch = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
		margin: '16px 0'
      }}
    >
      <div>
        自定义参数{' '}
        <Tooltip
          title={
            <>
              <div>开启后选项中的参数将不会被携带，可以在描述中进行自定义参数指定</div>
            </>
          }
        >
          <ExclamationCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <Form.Item noStyle valuePropName="checked" name="cus">
          <Switch size="small"></Switch>
        </Form.Item>
      </div>
    </div>
  );
};
