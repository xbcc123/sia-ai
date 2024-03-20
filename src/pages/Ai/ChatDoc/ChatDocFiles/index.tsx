import services from '@/services/ai';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Breadcrumb, Button, Card, Form, Popconfirm, Space, Table } from 'antd';
import { useResponsive } from 'antd-style';
import { useEffect, useRef, useState } from 'react';
import { libraryDocument } from '../types';
import { UploadDocModal } from './components/UploadDocModal';
import { UploadLinkModal } from './components/UploadLinkModal';
import useStyles from './index.module.style';
import {Back} from '@/components/Back';

const fileType = ['txt', 'word', 'pdf', 'html', 'markdown'];

export default () => {
  const { styles } = useStyles();
  const [result, setResult] = useState<{
    total: number;
    records: libraryDocument[];
  }>({ records: [], total: 0 });
  const [uploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [uploadLinkModalOpen, setUploadLinkModalOpen] = useState(false);
  const { mobile } = useResponsive();
  const [form] = Form.useForm();
  const urlParams = useRef<any>();
  const paginationRef = useRef({
    current: 1,
    size: 20,
  });
  const navigate = useNavigate();

  useEffect(() => {
    urlParams.current = new URLSearchParams(location.search);
    getData();
  }, []);

  const getData = async () => {
    try {
      const values = form.getFieldsValue();
      const { current: page, size: pageSize } = paginationRef.current;
      if (values.fileType || values.fileType?.length > 0) {
        values.fileType = values.fileType?.join?.(',');
      }
      const data: any = await services.ChatDocController.libraryListDocument({
        ...values,
        ...{
          page,
          pageSize,
        },
        ...{
          libraryId: Number(urlParams.current.get('id')),
        },
      });
      setResult(data);
    } catch (error) {}
  };

  // 删除
  const deleteCode = async ({ docId }: { docId: string }) => {
    try {
      await services.ChatDocController.documentDelete({
        libraryId: Number(urlParams.current.get('id')),
        docIds: [docId],
      });
      getData();
    } catch (error) {}
  };

  return (
    <div className={styles.contanir}>
      <Card size="small">
        <Space  style={{
              marginBottom: 24,
            }}>
          <Breadcrumb
           
            items={[
              {
                title: (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/ai/tools');
                    }}
                  >
                    AI工具
                  </span>
                ),
              },
              {
                title: (
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    知识库
                  </span>
                ),
              },
              {
                title: '测试文档',
              },
            ]}
          />
         <Back
	      style={{
			fontSize: 14,
			width: 30,
			height: 30
		  }}
          onClick={() => {
            navigate(-1);
          }}
        ></Back>
        </Space>
        <ProForm
          layout={mobile ? 'horizontal' : 'inline'}
          form={form}
          onFinish={async (values) => {
            getData();
          }}
        >
          <ProFormText label="标题" name="title" />
          <ProFormSelect
            request={async () =>
              fileType?.map?.((item) => {
                return {
                  label: item,
                  value: item,
                };
              })
            }
            name="fileType"
            label="类型"
            fieldProps={{
              mode: 'multiple',
              style: {
                width: 200,
              },
            }}
          />
          <ProFormDateRangePicker
            normalize={(value) => {
              if (!value) {
                return undefined;
              }
              return [
                value[0]?.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                value[1]?.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              ];
            }}
            name="date"
            label="日期"
          ></ProFormDateRangePicker>
        </ProForm>
        <Space style={{ marginTop: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              setUploadLinkModalOpen(true);
            }}
          >
            提交链接
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setUploadDocModalOpen(true);
            }}
          >
            上传文档
          </Button>
        </Space>

        <Table
          style={{ marginTop: 16, width: mobile ? window.innerWidth - 60 : '100%' }}
          scroll={{ x: true }}
          size="small"
          rowKey={'docId'}
          dataSource={result?.records}
          pagination={{
            current: paginationRef.current.current,
            pageSize: paginationRef.current.size,
            total: result?.total,
            onChange: (page, pageSize) => {
              paginationRef.current.current = page;
              paginationRef.current.size = pageSize;
              getData();
            },
          }}
          columns={[
            {
              title: '标题',
              dataIndex: 'title',
              key: 'title',
              render: (text, record) => {
                return record?.fileType === 'html' ? (
                  <Button
                    style={{
                      padding: 0,
                    }}
                    type="link"
                    onClick={() => {
                      window.open(record?.url);
                    }}
                  >
                    {text}
                  </Button>
                ) : (
                  text
                );
              },
            },
            {
              title: '类型',
              dataIndex: 'fileType',
              key: 'fileType',
            },
            {
              title: 'Tokens',
              dataIndex: 'totalTokens',
              key: 'totalTokens',
            },
            {
              title: 'Vectors',
              dataIndex: 'vectorSize',
              key: 'vectorSize',
            },
            {
              title: '修改时间',
              dataIndex: 'gmtModified',
              key: 'gmtModified',
            },
            {
              title: '状态',
              dataIndex: 'statusCode',
              key: 'statusCode',
            },
            {
              title: '操作',
              dataIndex: 'content',
              key: 'content',
              fixed: 'right',
              width: 80,
              render: (text, record: any) => {
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
      </Card>

      <UploadDocModal
        onOk={() => {
          setUploadDocModalOpen(false);
          getData();
        }}
        onCancel={() => setUploadDocModalOpen(false)}
        open={uploadDocModalOpen}
      ></UploadDocModal>

      <UploadLinkModal
        onOk={() => {
          setUploadLinkModalOpen(false);
          getData();
        }}
        onCancel={() => setUploadLinkModalOpen(false)}
        open={uploadLinkModalOpen}
      ></UploadLinkModal>
    </div>
  );
};
