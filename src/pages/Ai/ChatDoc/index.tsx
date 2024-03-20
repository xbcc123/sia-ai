import { CusIcon } from '@/components/Icon';
import { ATag } from '@/components/Tag/ATag';
import services from '@/services/ai';
import { useNavigate, useTheme } from '@umijs/max';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Flex,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import { ChatDocMessageModal } from './components/ChatDocMessageModal';
import { KnowledgeModal } from './components/KnowledgeModal';
import useStyles from './index.module.style';
import { Library } from './types';
import { LeftOutlined } from '@ant-design/icons';
import {Back} from '@/components/Back';

export default () => {
  const { styles } = useStyles();
  const token = useTheme();
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [chatDocMessageOpen, setChatDocMessageOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState<any>({});
  const [data, setData] = useState<{ total: number; records: Library[] }>({
    records: [],
    total: 0,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const data: any = await services.ChatDocController.libraryList({
        page: 1,
        pageSize: 100000,
      });
      setLoading(false);
      setData(data);
    } catch (error) {
      setLoading(false);
    }
  };

  // 操作按钮
  const renderDropdown = (item: any) => {
    return (
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: (
                <span
                  onClick={() => {
                    setIsEdit(true);
                    setCurrentLine(item);
                    setKnowledgeModalOpen(true);
                  }}
                >
                  编辑
                </span>
              ),
            },
            {
              key: '2',
              label: (
                <Popconfirm
                  title="确定删除对话吗？"
                  onConfirm={async () => {
                    try {
                      await services.ChatDocController.libraryDelete({
                        libraryId: item.id,
                      });
                      getData();
                    } catch (error) {}
                  }}
                  onCancel={() => {}}
                  okText="确定"
                  cancelText="取消"
                >
                  删除
                </Popconfirm>
              ),
            },
          ],
        }}
      >
        <span style={{ cursor: 'pointer' }}>
          <CusIcon icon={'fa-solid fa-ellipsis-vertical'}></CusIcon>
        </span>
      </Dropdown>
    );
  };

  return (
    <div className={styles.contanir}>
      <Typography.Title level={3}>知识库</Typography.Title>
      <Flex justify="space-between">
        <Space>
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
                title: '知识库',
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
        <Button
          type="primary"
          onClick={() => {
            setCurrentLine({});
            setKnowledgeModalOpen(true);
          }}
        >
          创建
        </Button>
      </Flex>

      <Row style={{ marginTop: 12 }} gutter={[16, 16]}>
        {loading && <Skeleton active />}
        {data?.records?.map?.((item, index) => {
          return (
            <Col xs={24} key={index} sm={12} md={6}>
              <Card size="small">
                <Flex justify="space-between">
                  <Typography.Title
                    level={5}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/ai/tools/chat-doc/files?id=${item.id}`);
                    }}
                  >
                    <Button type="link" style={{ padding: 0 }}>
                      {item.libraryName}
                    </Button>
                  </Typography.Title>
                  {renderDropdown(item)}
                </Flex>
                <div style={{ fontSize: 12, color: token?.colorTextTertiary }}>
                  {item.description}
                </div>
                <div style={{ marginTop: 6 }}>
                  <Space>
                    <Typography.Text style={{ fontSize: 12 }}>
                      {item.documentCount} 文档
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: 12 }}>
                      {item.totalTokens} Tokens
                    </Typography.Text>
                  </Space>
                </div>
                <Divider plain style={{ margin: '8px 0' }} />
                <Flex justify="space-between" align="center">
                  <Space>
                    <Typography.Text style={{ fontSize: 12 }}>
                      {item.queryCount} 请求
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: 12 }}>
                      更新时间 {item.gmtModified}
                    </Typography.Text>
                  </Space>
                  <ATag
                    pointer
                    type="default"
                    onClick={() => {
                      setCurrentLine(item);
                      setChatDocMessageOpen(true);
                    }}
                  >
                    点击聊天
                  </ATag>
                </Flex>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* 新建知识库 */}
      <KnowledgeModal
        isEdit={isEdit}
        onOk={() => {
          setKnowledgeModalOpen(false);
          getData();
        }}
        onCancel={() => setKnowledgeModalOpen(false)}
        open={knowledgeModalOpen}
        info={currentLine}
      ></KnowledgeModal>

      {/* 消息 */}
      <ChatDocMessageModal
        open={chatDocMessageOpen}
        onCancel={() => {
          setChatDocMessageOpen(false);
        }}
        detail={currentLine}
      ></ChatDocMessageModal>
    </div>
  );
};
