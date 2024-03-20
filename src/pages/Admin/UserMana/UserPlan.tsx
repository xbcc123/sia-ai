import services from '@/services/admin';
import {ProForm, ProFormText, ProFormSwitch, ProFormRadio, ProFormSelect} from '@ant-design/pro-components';
import { text } from '@fortawesome/fontawesome-svg-core';
import {Button, Card, Popconfirm, Space, Table, Tag, Tooltip, Typography} from 'antd';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: any) => {
    try {
      const data = await services.UserController.userPackageSearchList({
        ...paginationRef.current,
        ...{
          condition,
        },
      });
      setResult(data);
    } catch (error) {}
  };

  // 删除兑换码
  const deleteCode = async ({ id }: { id: string }) => {
    try {
      await services.UserController.userPackageRemove({
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
			paginationRef.current.current = 1
          getData(values);
        }}
      >
        <ProFormText label="ID" name={'id'} />
        <ProFormText label="用户ID" name={'userId'} />
        <ProFormText label="名称" name={'name'} />
		<ProFormSelect
          name="eachDay"
          label="每日重置"
		  options={[
			{
			  label: '全部',
			  value: ''
			},
			{
				label: '是',
				value: 1
			  },
			{
			  label: '否',
			  value: 0
			},
		  ]}
        />
      </ProForm>

      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600, }}
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
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '积分量',
            dataIndex: 'integral',
            key: 'integral',
			render: (text: any, record: any) => {
				return <>
					<div style={{marginBottom: 4}}>全部：{record.integral || '-'}</div>
					<div><Typography.Text type="danger">已用：{record?.remain || '-'}</Typography.Text></div>
				</>
			}
          },
		  {
            title: '过期时间',
            dataIndex: 'endTime',
            key: 'endTime',
          },
		  {
            title: '每日重置',
            dataIndex: 'eachDay',
            key: 'eachDay',
			render: (text) => text === 1 ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
          },
		  {
            title: '最后重置时间',
            dataIndex: 'resetTime',
            key: 'resetTime',
			render: text => text || '-'
          },
		  {
            title: '创建时间',
            dataIndex: 'startTime',
            key: 'startTime',
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
			fixed: 'right',
            render: (text, record) => {
              return (
                <Space>
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

    </Card>
  );
};
