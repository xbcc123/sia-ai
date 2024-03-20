import { ATag } from '@/components/Tag/ATag';
import { Tip } from '@/components/Tip';
import services from '@/services/admin';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Form, Popconfirm, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { EditDrawerForm } from './components/EditDrawerForm';
import {accountControl} from '../../../services/admin/DrawController';

export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { modeList } = useModel('modes');
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
      const data = await services.DrawController.accountSearchList({
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
      await services.DrawController.accountDelete({
        id,
      });
      getData({});
    } catch (error) {}
  };

// 服务启动/停止/重启
const accountControl = async ({ id }: { id: string }, action: string) => {
    try {
      await services.DrawController.accountControl({
        id,
		action
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
        <ProFormText label="是否可用" name={'isValid'} />
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
        scroll={{ x: 1500 }}
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
            title: '类型',
            dataIndex: 'platform',
            key: 'platform',
          },
          {
            title: '可用性',
            dataIndex: 'isValid',
            key: 'isValid',
            width: 100,
			render: (text) => text === 1 ? <div style={{color: 'green'}}>是</div> : <div style={{color: 'red'}}>否</div>
          },
          {
            title: '配置信息',
            dataIndex: 'config',
            key: 'config',
            width: 500,
            render: (text: any, record: any) => {
              return (
                <div style={{ fontSize: 12 }}>
                  <div>
                    <span>Discord服务器ID：</span>
                    {text.discordServerId}
                  </div>
                  <div>
				  <span>Discord频道ID：</span>
                    {text.discordChannelId}
                  </div>
                  <div>
				  <span>Discord用户Token：</span>
                    {text.discordUserToken}
                  </div>
                  <div>
				  <span>DiscordRobotToken：</span>
                    {text.discordRobotToken}
                  </div>
                  <div>
                    <span>discordSessionId：</span>
                    {text.discordSessionId}
                  </div>
                  <div>
                    <span>超时时间(分钟)</span>
					{text.timeout}
                  </div>
                </div>
              );
            },
          },
          {
            title: '运行状态',
            dataIndex: 'state',
            key: 'state',
            render: (text: number, record: any) => {
              return (
                <div style={{ fontSize: 12 }}>
                  {text === 0 && <div style={{color: 'red'}}>已停止</div>}
                  {text === 1 && <div style={{color: 'blue'}}>运行中</div>}
                  <div>队列进行中 {record.config.conQueueSize} 个</div>
                  <div>队列等待中 {record.config.waitQueueSize} 个</div>
                </div>
              );
            },
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
                <>
                  {record.state === 0 && (
                    <Popconfirm
                      title="确定启动服务吗？"
                      onConfirm={() => {
						accountControl(record, 'start')
					  }}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="link" >
                        启动服务
                      </Button>
                    </Popconfirm>
                  )}
                  {record.state === 1 && (
                    <>
                      <Popconfirm
                        title="确定启动服务吗？"
                        onConfirm={() => {
							accountControl(record, 'restart')
						}}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button type="link">
                          重启服务
                        </Button>
                      </Popconfirm>
                      <Popconfirm
                        title="确定停止服务吗？"
                        onConfirm={() => {
							accountControl(record, 'stop')
						}}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button type="link" >
                          停止服务
                        </Button>
                      </Popconfirm>
                    </>
                  )}
                  <Button type="link" onClick={() => {
					setCurrentLine(record);
					setVisible(true);
					setIsEdit(true);
				  }}>
                    编辑
                  </Button>
                  <Popconfirm
                    title="确定删除吗？"
                    onConfirm={() => {
						deleteCode(record)
					}}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="link" >
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
