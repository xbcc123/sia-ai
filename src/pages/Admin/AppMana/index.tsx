import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import {Button, Card, Popconfirm, Space, Table, Tag, Tooltip} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
import {SubText} from '../../../components/Text/index';
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

  useEffect(() => {
    getData({});
  }, []);

  const getData = async (condition: any) => {
    try {
      const data = await services.AppController.appSearchList({
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
      await services.AppController.appRemove({
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
        <ProFormText tooltip={  <>
			支持Emoji，fontawesome
          </>} label={
        '图标'
        }  name={'icon'} />
        <ProFormText label="描述" name={'description'} />
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
        scroll={{ y: 1000, x: 1500 }}
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
            title: '应用设定',
            dataIndex: 'prompt',
            key: 'prompt',
			width: 160,
			ellipsis: true,
			render:(text) => {
				return <Tooltip title={text}><div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
          {
            title: '模型',
            dataIndex: 'model',
            key: 'model',
			width: 160,
            render: (text, record: any) => {
              return (
                <>
                  <Tag style={{marginBottom: 4}}>{record.model}</Tag>
                  <Tag style={{marginBottom: 4}}>随机性：{record.temperature}</Tag>
                  <Tag style={{marginBottom: 4}}>新鲜度：{record.presencePenalty}</Tag>
                  <Tag>重复度：{record.frequencyPenalty}</Tag>
                </>
              );
            },
          },
          {
            title: '分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
          },
          {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
          },
          {
            title: '描述',
            dataIndex: 'description',
            key: 'description',	
			width: 160,
			ellipsis: true,
			render:(text) => {
				return <Tooltip title={text}><div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
          {
            title: '输入占位',
            dataIndex: 'placeholder',
            key: 'placeholder',
			width: 160,
			ellipsis: true,
			render:(text) => {
				return <Tooltip title={text}><div className='singleLine' style={{width: 160}}>{text}</div> </Tooltip>
			}
          },
          {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
          },
          {
            title: '输入设定',
            dataIndex: 'submitTitle',
            key: 'submitTitle',
			width: 200,
            render: (text: string, record: any) => {
              return (
                <>
                  <Tag style={{marginBottom: 4}}>提交按钮名称：{record.submitTitle}</Tag>
                  <Tag>最大输入长度：{record.maxLength}</Tag>
                </>
              );
            },
          },
          {
            title: '是否公开',
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
        }}
		onOk={() => {
			getData({})
			setVisible(false)
		}}
      ></EditDrawerForm>
    </Card>
  );
};
