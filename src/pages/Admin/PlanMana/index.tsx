import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import {Button, Card, Popconfirm, Space, Table, Tag, Tooltip, message} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
import {usePlanClass} from '../hooks/planClass';
import { getModeFormModeList } from '@/utils/format';
import {getModeFormModeListAndValue} from '../../../utils/format';
export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });
  const [currentLine, setCurrentLine] = useState({});
  const { planClass } = usePlanClass()

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: any) => {
    try {
      const data = await services.PlanController.searchList({
        ...paginationRef.current,
        ...{
          condition,
        },
      });
      setResult(data);
    } catch (error) {}
  };

  // 删除
  const deleteCode = async ({ id }: { id: string }) => {
    try {
      await services.PlanController.remove({
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
        <ProFormText label="名称" name={'name'} />
        <ProFormText label="描述" name={'description'} />
        {/* <ProFormText label="更新时间" name={'email'} /> */}
        {/* <ProFormText label="创建时间" name={'email'} /> */}
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
        scroll={{ y: 600}}
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
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
			ellipsis: true,
			width: 160,
			render:(text) => {
				return <Tooltip title={text}> <div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
		  {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
			render:(text) => {
				return getModeFormModeListAndValue(planClass || [], text)?.label || text || '-'
			}
          },
          {
            title: '价格（分）',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: '有效天数',
            dataIndex: 'expireDay',
            key: 'expireDay',
          },
		  {
            title: '积分数量',
            dataIndex: 'integral',
            key: 'integral',
          },
          {
            title: '每日重置',
            dataIndex: 'eachDay',
            key: 'eachDay',
			render: (text) => text === 1 ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
          },
		  {
            title: '排序值',
            dataIndex: 'sort',
            key: 'sort',
          },	  
		  {
            title: '折扣比例',
            dataIndex: 'discount',
            key: 'discount',
          },
		//   {
        //     title: '外部购买链接',
        //     dataIndex: 'createTime',
        //     key: 'createTime',
        //   },
		  {
            title: '启用',
            dataIndex: 'isPublic',
            key: 'isPublic',
			render: (text) => text === 1 ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
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
            fixed: 'right',
			width: 150,
            render: (text, record: any) => {
              return (
                <Space>
				  <Popconfirm
                    title="确定生成兑换码吗？"
                    onConfirm={async () => {
						try {
							await services.ExChangeCodeController.exchangeCodeBatch({
								"pkgId": record.id,
								"number": 1
							})
							message.success('兑换码生成成功，请前往兑换码管理查看')
						} catch (error) {
							
						}
					}}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button
                    type="link"
                    style={{ padding: 0 }}
                  >
                    生成兑换码
                  </Button>
                  </Popconfirm>
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
			getData({})
		}}
      ></EditDrawerForm>
    </Card>
  );
};
