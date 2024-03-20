import services from '@/services/admin';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Table, message, Image, Popconfirm, Space } from 'antd';
import { values } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import {useModel} from '@umijs/max';
import { getModeFormModeList } from '@/utils/format';
import {convertedArray} from '../../../utils/format';
import { IOrderStatusEnum } from '@/types';
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
      const data = await services.OrderController.searchList({
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
      await services.OrderController.remove({
		id
	  })
	  getData({})
    } catch (error) {}
  };

  return (
    <Card>
      <ProForm layout="inline" submitter={{
		  submitButtonProps: {
			style: {
				marginTop: 8
			},
		  },
		  resetButtonProps: {
			style: {
				marginTop: 8
			},
		  },
	  }} onFinish={async (values) => {
		paginationRef.current.current = 1
		getData(values)
	  }}>
		<Space wrap>
			<ProFormText label="ID" name={'id'} />
			<ProFormText label="套餐ID" name={'pkgId'} />
			<ProFormText label="用户ID" name={'userId'} />
			<ProFormText label="支付方式" name={'platform'} />
			<ProFormSelect
				request={async () => convertedArray(IOrderStatusEnum)}
				name="state"
				label="支付状态"
				fieldProps={{
				style: {
					width: 200,
				},
				}}
			/>
		</Space>
      </ProForm>

      <Table
        style={{ marginTop: 16 }}
		scroll={{ y: 600, x: 1200 }}
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
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			  },
        //   {
        //     title: '订单编号',
        //     dataIndex: 'email',
        //     key: 'email',
        //   },
          {
            title: '套餐ID',
            dataIndex: 'pkgId',
            key: 'pkgId',
          },
		  {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
          },
		  {
            title: '支付方式',
            dataIndex: 'platform',
            key: 'platform',
          },
		  {
            title: '金额（分）',
            dataIndex: 'price',
            key: 'price',
          },
		  {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
			render: (text) => text ? (IOrderStatusEnum as any)[text] : '-'
          },
		  {
            title: '支付信息',
            dataIndex: 'info',
            key: 'info',
			width:200,
			render: (text: any) => {
				return <div style={{fontSize: 12}}>
				<div>订单标题：{text?.subject || '-'}</div>
				<div>支付凭证：{text?.tradeNo|| '-'}</div>
				{/* <div>商品描述：{text?.body|| '-'}</div> */}
				<div>支付买家：{text?.buyerId|| '-'}</div>
				</div>
			}
          },
		  {
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
			width: 200,
			render: (text: string, record: any) => {
				return <div style={{fontSize: 12}}>
				<div>创建：{record.createTime}</div>
				<div>更新：{record.updateTime}</div>
				</div>
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
