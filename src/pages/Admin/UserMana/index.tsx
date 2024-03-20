import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Popconfirm, Space, Table, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
import { ResPwDrawerForm } from './components/ResPwDrawerForm';
export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const [resPwVisible, setResPwVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });
  const [currentLine, setCurrentLine] = useState({});

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: any) => {
    try {
      const data = await services.UserController.searchList({
        ...paginationRef.current,
        ...{
          condition,
        },
      });
      setResult(data);
    } catch (error) {}
  };

  // 删除
  const deleteCode = async (record: any) => {
    try {
      await services.UserController.userPackageRemove({
        id: record?.userId,
      });
      getData({});
    } catch (error) {}
  };

  return (
    <Card>
      <ProForm
        layout="inline"
        onFinish={async (values) => {
			paginationRef.current.current = 1
          getData(values);
        }}
      >
        <ProFormText label="ID" name={'userId'} />
        <ProFormText label="昵称" name={'nickName'} />
        {/* <ProFormText label="手机号" name={'phone'} /> */}
      </ProForm>

      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600 }}
        size="small"
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
            dataIndex: 'userId',
            key: 'userId',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
			render: text => text || '-'
          },
          {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
			render: text => text || '-'
          },
          {
            title: '角色',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text) =>
              text === 1 ? <Tag color="green">管理员</Tag> : <Tag>普通用户</Tag>,
          },
          {
            title: '上次登录IP',
            dataIndex: 'ip',
            key: 'ip',
			render: text => text || '-'
          },
          {
            title: '邀请人',
            dataIndex: 'inviter',
            key: 'inviter',
			render: text => text || '-'
          },
          {
            title: '上次登录时间',
            dataIndex: 'lastTime',
            key: 'lastTime',
			render: text => text || '-'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
            fixed: 'right',
			width: 200,
            render: (text, record) => {
              return (
                <Space>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setCurrentLine(record);
                      setResPwVisible(true);
                    }}
                  >
                    重置密码
                  </Button>
                  <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setCurrentLine(record);
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
        }}
        onOk={() => {
          setVisible(false);
          getData({});
        }}
      ></EditDrawerForm>

      <ResPwDrawerForm
        visible={resPwVisible}
        detail={currentLine}
        onClose={function (): void {
          setResPwVisible(false);
        }}
        onOk={function (): void {
          setResPwVisible(false);
        }}
      ></ResPwDrawerForm>
    </Card>
  );
};
