import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Space, Table, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
export default () => {
//   const [result, setResult] = useState({
//     records: [],
//     total: 0,
//   });
  const [dataSource, setDataSource] = useState([])
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
//   const paginationRef = useRef({
//     current: 1,
//     size: 20,
//   });
  const [currentLine, setCurrentLine] = useState({});

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: any) => {
    try {
      const data = await services.ClassController.searchList({
		...{
			grounp: 'APP'
		},
        ...condition,
      });
      setDataSource(data);
    } catch (error) {}
  };

  // 删除兑换码
  const deleteCode = async ({ id }: { id: string }) => {
    try {
      await services.ClassController.remove({
        id,
      });
      getData({});
    } catch (error) {}
  };

  return (
    <Card>
      <ProForm
        layout="inline"
        onFinish={async (values) => {
          getData(values);
        }}
      >
        <ProFormText label="ID" name={'id'} />
        <ProFormText label="名称" name={'name'} />
      </ProForm>

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
            setIsEdit(false);
          }}
        >
          新增
        </Button>
      </div>

      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600 }}
        size="small"
        dataSource={dataSource}
		pagination={false}
        // pagination={{
        //   current: paginationRef.current.current,
        //   pageSize: paginationRef.current.size,
        //   total: result.total,
        //   onChange: (page, pageSize) => {
        //     paginationRef.current.current = page;
        //     paginationRef.current.size = pageSize;
        //     getData({});
        //   },
        // }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'key',
            dataIndex: 'key',
            key: 'key',
          },
		  {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
          },
          {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => {
              return (
                <Space>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
					  setCurrentLine(record)
                      setVisible(true);
                      setIsEdit(true);
                    }}
                  >
                    编辑
                  </Button>
                  <Popconfirm
                    title="确定删除吗？"
                    onConfirm={() => deleteCode(record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link" style={{ padding: 0 }}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      ></Table>

      <EditDrawerForm
        isEdit={isEdit}
        visible={visible}
		detail={currentLine}
        onClose={function (): void {
          setVisible(false);
		  getData({})
        }}
      ></EditDrawerForm>
    </Card>
  );
};
