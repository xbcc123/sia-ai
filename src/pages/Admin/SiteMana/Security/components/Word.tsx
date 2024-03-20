import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Form, Popconfirm, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './EditDrawerForm';

export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentLine, setCurrentLine] = useState({});

  const [form] = Form.useForm();
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: {} | undefined) => {
    try {
      const data =
        await services.SiteSecurityController.sensitiveWordSearchList({
          ...paginationRef.current,
          ...{
            condition,
            ...{
              id: Number(condition),
            },
          },
        });
      setResult(data);
    } catch (error) {}
  };

  // 删除兑换码
  const deleteCode = async ({ id }: { id: string }) => {
    try {
      await services.SiteSecurityController.sensitiveWordRemove({
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
        <ProFormText label="关键字" name={'keyword'} />
      </ProForm>
	  
	 <Button type='primary' style={{marginTop: 16}} onClick={() => {
		setIsEdit(false)
		setVisible(true)
	 }}>新增</Button>
      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600 }}
        size="small"
        rowKey={'id'}
        dataSource={result?.records}
        pagination={{
          current: paginationRef.current.current,
          pageSize: paginationRef.current.size,
          total: result.total,
          onChange: (page, pageSize) => {
            paginationRef.current.current = page;
            paginationRef.current.size = pageSize;
            getData({});
          },
        }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '关键词',
            dataIndex: 'keyword',
            key: 'keyword',
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => {
              return (
                <>
                  <Button
                    style={{ paddingLeft: 0 }}
                    onClick={() => {
						setVisible(true);
						setIsEdit(true)
                      setCurrentLine(record);
                    }}
                    type="link"
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
                </>
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
        }}
        onOk={() => {
          setVisible(false);
          getData({});
        }}
      ></EditDrawerForm>
    </Card>
  );
};
