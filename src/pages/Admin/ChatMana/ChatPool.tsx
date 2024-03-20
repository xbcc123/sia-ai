import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import {
  ProForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Popconfirm, Space, Table, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
import {getModeFormModeList, getModeFormModeListAndValue} from '../../../utils/format';
import {usePlatformList} from '@/hooks/platform';

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
  const [form] = Form.useForm()
  const [currentLine, setCurrentLine] = useState({});
  const platformList = usePlatformList()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
	let params = form.getFieldsValue()
	
	params.isValid = params.isValid  ? 1 : 0 
    try {
      const data = await services.ChatController.accountSearchList({
        ...paginationRef.current,
        ...{
			condition:params,
        },
      });
      setResult(data);
    } catch (error) {}
  };

  // 删除
  const deleteCode = async ({ id }: { id: string }) => {
    try {
      await services.ChatController.accountRemove({
        id,
      });
      getData();
    } catch (error) {}
  };

  return (
    <Card>
      <ProForm
        layout="inline"
		initialValues={{
			isValid: true
		}}
		form={form}
        onFinish={async (values) => {
			paginationRef.current.current = 1
          getData();
        }}
      >
        <ProFormText label="ID" name={'id'} />
        <ProFormText label="名称" name={'name'} />
        <ProFormText label="KEY值" name={'key'} />
        <ProFormSwitch label="可用性" name={'isValid'} />
      </ProForm>

        <Button
          type="primary"
		  style={{ marginTop: 16 }}
          onClick={() => {
            setVisible(true);
            setIsEdit(false);
          }}
        >
          新增
        </Button>

      <Table
        style={{ marginTop: 16 }}
        scroll={{ y: 600 }}
		rowKey={'id'}
        size="small"
        dataSource={result?.records}
        pagination={{
          current: paginationRef.current.current,
          pageSize: paginationRef.current.size,
          total: result.total,
          onChange: (page, pageSize) => {
            paginationRef.current.current = page;
            paginationRef.current.size = pageSize;
            getData();
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
            title: 'KEY值',
            dataIndex: 'key',
            key: 'key',
          },
          {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
			render: (text: string) => {
				return getModeFormModeListAndValue(platformList || [], text)?.label
			}
          },
        //   {
        //     title: '提示',
        //     dataIndex: 'integral',
        //     key: 'integral',
        //   },
          {
            title: '模型集',
            dataIndex: 'model',
            key: 'model',
          },
          {
            title: '可用性',
            dataIndex: 'isValid',
            key: 'isValid',
			render: (text) => text === 1 ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
          },
        //   {
        //     title: '上次检测时间',
        //     dataIndex: 'checkTime',
        //     key: 'checkTime',
        //   },
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
                <Space wrap>
                  {/* <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={async () => {
						try {
							await services.ChatController.accountUpdateValid({id: record.id})
							getData()
						} catch (error) {
							
						}
                    }}
                  >
                    变更
                  </Button> */}
                  {/* <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={() => {
             
                    }}
                  >
                    用量
                  </Button> */}
                  {/* <Button
                    type="link"
                    style={{ padding: 0 }}
                    onClick={async () => {
						try {
							await services.ChatController.accountTest({id: record.id})
							message.success('模型可用')
						} catch (error) {
						}
                    }}
                  >
                    测试
                  </Button> */}
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
          getData();
        }}
      ></EditDrawerForm>
    </Card>
  );
};
