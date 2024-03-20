import services from '@/services/admin';
import { DrawerForm, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Card, Form, Table, message } from 'antd';
import { useEffect, useState } from 'react';
export default () => {
  const [result, setResult] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await services.PlanController.categoryList({});
      setResult(data);
    } catch (error) {}
  };

  return (
    <Card>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={() => {
			setVisible(true)
			form.setFieldsValue({
				config: JSON.stringify(result)
			})
		}}>
          编辑
        </Button>
      </div>

      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600 }}
        size="small"
        dataSource={result}
        pagination={false}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'KEY',
            dataIndex: 'key',
            key: 'key',
          },
        ]}
      ></Table>

      <DrawerForm
        title="编辑"
        layout="horizontal"
		form={form}
        open={visible}
        autoFocusFirstInput
        drawerProps={{
          destroyOnClose: true,
          onClose: () => {
            setVisible(false);
          },
        }}
        onFinish={async (values) => {
			let config: any = []
			try {
				config = JSON.parse(values?.config)				
			} catch (error) {
				config = null
			}
			if(!config) {
				message.error('请输入正确的JSON格式')
				return 
			}
          try {
            await services.PlanController.categoryEdit(config);
            message.success('提交成功');
			setVisible(false);
			getData()
          } catch (error) {}
          return true;
        }}
      >
        <ProFormTextArea
          label="配置"
          name={'config'}
          rules={[{ required: true }]}
        />
      </DrawerForm>
    </Card>
  );
};
