import services from '@/services/admin';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import {Button, Card, Form, Table, message, Image, Popconfirm, Tag, Tooltip} from 'antd';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import {IDrawEnum, drawStatusMap} from '../../../types/index';
import { useModel } from '@umijs/max';
export default () => {
  const [result, setResult] = useState({
	records: [],
	total: 0
  });
  const [form] = Form.useForm();
  const paginationRef = useRef({
	current:1,
    size:20,
  })
  const { initialState } = useModel("@@initialState")
  const { setting } = initialState

  useEffect(() => {
	getData({})
  }, []);

  const getData = async (condition: {} | undefined) => {
    try {
      const data = await services.DrawController.searchList({
		...paginationRef.current,
		...{
			condition
		}
	  })
	  setResult(data)
    } catch (error) {}
  };

// 删除兑换码
  const deleteCode = async ({id}: {id: string}) => {
    try {
      await services.DrawController.imageDelete({
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
        <ProFormText label="ID" name={'taskId'} />
        <ProFormText label="用户ID" name={'userId'} />
        <ProFormText label="描述搜索" name={'keyword'} />
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
          },
          {
            title: '画面描述',
            dataIndex: 'prompt',
            key: 'prompt',
			ellipsis: true,
			width: 160,
			render:(text) => {
				return <Tooltip title={text}> <div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
          {
            title: '画像',
            dataIndex: 'miniUrl',
            key: 'miniUrl',
			render:(text) => {
				return <Image src={`${setting?.domain}${text}`}></Image>
			}
          },
          {
            title: '操作类型',
            dataIndex: 'action',
            key: 'action',
			render: (text) => (IDrawEnum as any)[text]
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
			render: (text) => (drawStatusMap as any)[text]
          },
          {
            title: '公开',
            dataIndex: 'isPublic',
            key: 'isPublic',
			render: (text) => text === '1' ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
          },
		  {
            title: '提交时间',
            dataIndex: 'submitTime',
            key: 'submitTime',
			render: (text) => {
				return moment(text).format('YYYY-MM-DD HH:mm:ss')
			}
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
