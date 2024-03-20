import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Switch, Tooltip } from 'antd';

export const SaveParamsSwitch = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
		margin: '16px 0'
      }}
    >
      <div>
        保留参数{' '}
        <Tooltip
          title={
            <>
              <div>开启后选项中的参数不会清空</div>
            </>
          }
        >
          <ExclamationCircleOutlined />
        </Tooltip>
      </div>
      <div>
        <Form.Item noStyle valuePropName="checked" name="saveParams">
          <Switch size="small"></Switch>
        </Form.Item>
      </div>
    </div>
  );
};
