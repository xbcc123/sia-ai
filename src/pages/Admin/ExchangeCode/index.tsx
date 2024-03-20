import services from '@/services/admin';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Form, Popconfirm, Table, message } from 'antd';
import { values } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default () => {
  const [result, setResult] = useState({
    records: [],
    total: 0,
  });
  const [pkgList, setPkgList] = useState([])
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });

  useEffect(() => {
    getData({});
    getPkgList();
  }, []);

  //  获取套餐列表
  const getPkgList = async () => {
    try {
      const data = await services.PlanController.searchList({
		current: 1,
		size: 10000,
	  });
      setPkgList(data?.records?.map?.(item => {
		return {
			...item,
			label: item.name,
			value: item.id,
		}
	  }));
    } catch (error) {}
  };

  const getData = async ({ condition }: any) => {
    try {
      const data = await services.ExChangeCodeController.exchangeCodeList({
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
      await services.ExChangeCodeController.exchangeCodeDelete({
        ids: id,
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
        <ProFormText label="兑换码" name={'code'} />
      </ProForm>

      <div style={{ marginTop: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          批量生成
        </Button>
      </div>

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
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '套餐名称',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '兑换码',
            dataIndex: 'code',
            key: 'code',
            render: (text) => {
              return (
                <CopyToClipboard
                  text={text}
                  onCopy={() => {
                    message.success('兑换码复制成功');
                  }}
                >
                  <div style={{ cursor: 'pointer' }}>{text}</div>
                </CopyToClipboard>
              );
            },
          },
          {
            title: '使用用户ID',
            dataIndex: 'userId',
            key: 'userId',
            render: (text) => {
              return text || '-';
            },
          },
        //   {
        //     title: '类型',
        //     dataIndex: 'category',
        //     key: 'category',
        //   },
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
            title: '时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (text: string, record: any) => {
              return (
                <div style={{ fontSize: 12 }}>
                  <div>创建：{record.createTime}</div>
                  {record.exchangeTime && (
                    <div>兑换时间：{record.exchangeTime}</div>
                  )}
                </div>
              );
            },
          },
          {
            title: '操作',
            dataIndex: 'content',
            key: 'content',
            render: (text, record) => {
              return (
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
              );
            },
          },
        ]}
      ></Table>

      <ModalForm
        title="批量生成兑换码"
        layout="horizontal"
        open={visible}
        form={form}
        width={400}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setVisible(false);
          },
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          try {
            await services.ExChangeCodeController.exchangeCodeBatch(values);
            getData({});
            message.success('提交成功');
            setVisible(false);
          } catch (error) {}
          return true;
        }}
      >
        <ProFormSelect
          label="套餐"
          name={'pkgId'}
          options={pkgList}
          rules={[{ required: true }]}
        />
        <ProFormDigit
          label="数量"
          name={'number'}
          min={1}
          max={10}
          rules={[{ required: true }]}
          fieldProps={{ precision: 0 }}
        />
      </ModalForm>
    </Card>
  );
};
