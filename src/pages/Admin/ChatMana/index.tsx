import services from '@/services/admin';
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Table, message, Image, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {useModel} from '@umijs/max';
import { getModeFormModeList } from '@/utils/format';
export default () => {
  const [result, setResult] = useState({
	records: [],
	total: 0
  });
  const { modeList} = useModel('modes');
  const [form] = Form.useForm();
  const paginationRef = useRef({
	current:1,
    size:20,
  })

  useEffect(() => {
	getData({})
  }, []);

  const getData = async (condition: {} | undefined) => {
    try {
      const data = await services.ChatController.sessionSearchList({
		...paginationRef.current,
		...{
			condition, 
			...{
				id: Number(condition)
			}
		}
	  })
	  setResult(data)
    } catch (error) {}
  };

// 删除兑换码
  const deleteCode = async ({id}: {id: string}) => {
    try {
      await services.ChatController.sessionRemove({
		id
	  })
	  getData({})
    } catch (error) {}
  };

  return (
    <Card>
      <ProForm layout="inline" onFinish={async (values) => {
		paginationRef.current.current = 1
		getData(values)
	  }}>
        <ProFormText label="ID" name={'id'} />
        <ProFormText label="用户ID" name={'userId'} />
        <ProFormText label="名称" name={'keyword'} />
		<ProFormSelect
        request={async () => modeList}
        name="model"
        label="模型"
 
        fieldProps={{
          style: {
            width: 200,
          },
        }}
      />
      </ProForm>

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
            }
		  }}
        columns={[
			{
				title: '任务ID',
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
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: '模型',
            dataIndex: 'model',
            key: 'model',
			render: (text) => {
				return getModeFormModeList(modeList, text)?.name
			}
          },
          {
            title: '最大token',
            dataIndex: 'maxToken',
            key: 'maxToken',
          },
          {
            title: '上下文数量',
            dataIndex: 'context',
            key: 'context',
          },
          {
            title: '随机性',
            dataIndex: 'random',
            key: 'random',
          },
		  {
            title: '新鲜度',
            dataIndex: 'fresh',
            key: 'fresh',
          },
		  {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width: 200,
            render: (text: string, record: any) => {
              return (
                <div style={{ fontSize: 12 }}>
                  <div>创建：{record.createTime}</div>
                  <div>更新：{record.updateTime}</div>
                </div>
              );
            },
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => {
				return  <Popconfirm
				title="确定删除吗？"
				onConfirm={() => deleteCode(record)}
				okText="确定"
				cancelText="取消"
			  >
				<Button type='link'  style={{padding: 0}}>删除</Button>
			  </Popconfirm>
            },
          },
        ]}
      ></Table>
    </Card>
  );
};
