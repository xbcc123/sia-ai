import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Col, Form, Row, Typography } from 'antd';
import useStyles from '../index.module.style';

export default () => {
	const { styles } = useStyles();
  const [form] = Form.useForm();
  return (
    <div className={styles.container}>
      <Card style={{width: '100%'}}>
        <Typography.Title level={5}>修改密码</Typography.Title>
        <Row >
          <Col xs={24} sm={12}>
            {' '}
            <ProForm
              form={form}
              style={{ marginTop: 24 }}
              layout={'horizontal'}
              labelCol={{ span: 4 }}
              submitter={{ render: () => <></> }}            >
              <ProFormText.Password label="原密码" name="input-password" />
              <ProFormText.Password label="新密码" name="old-input-password" />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="primary" onClick={() => form?.submit()}>
                  保存信息
                </Button>
              </div>
            </ProForm>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
