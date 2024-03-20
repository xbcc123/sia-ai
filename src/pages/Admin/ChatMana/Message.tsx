import services from '@/services/admin';
import { getModeFormModeList } from '@/utils/format';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Table,  Popconfirm, Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {useModel} from '@umijs/max';
export default () => {
  const [result, setResult] = useState({
	records: [],
	total: 0
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { modeList} = useModel('modes');
  const paginationRef = useRef({
	current:1,
    size:20,
  })

  useEffect(() => {
	getData({})
  }, []);

  const getData = async (condition: {} | undefined) => {
    try {
      const data = await services.ChatController.messageSearchList({
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
      await services.ChatController.messageRemove({
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
        <ProFormText label="问题" name={'question'} />
        <ProFormText label="回答" name={'answer'} />
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
            title: '会话id',
            dataIndex: 'sessionId',
            key: 'sessionId',
          },
          {
            title: '问题',
            dataIndex: 'question',
            key: 'question',
			ellipsis: true,
			width: 160,
			render:(text) => {
				return <Tooltip title={text}> <div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
          {
            title: '回答',
            dataIndex: 'answer',
            key: 'answer',
			width: 160,
			ellipsis: true,
			render:(text) => {
				return <Tooltip title={text}><div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
        //   {
        //     title: 'IP',
        //     dataIndex: 'status',
        //     key: 'status',
        //   },
		{
            title: '模型',
            dataIndex: 'model',
            key: 'model',
			render: (text) => {
				return getModeFormModeList(modeList, text)?.name
			}
          },
		  {
            title: '扣除',
            dataIndex: 'cost',
            key: 'cost',
          },
		  {
            title: '返回',
            dataIndex: 'back',
            key: 'back',
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
