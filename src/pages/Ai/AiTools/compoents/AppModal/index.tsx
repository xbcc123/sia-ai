import services from '@/services/ai';
import { Button, Card, Col, Flex, Modal, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import useStyles from './index.module.style';

export const AppModal = ({
  open,
  onCancel,
  onClicked,
}: {
  open: boolean;
  onCancel: () => void;
  onClicked: () => void;
}) => {
  const { styles } = useStyles();
  const [list, setList] = useState<
    {
      category: string;
      appList: any[];
    }[]
  >([]);
  const [viewAllList, setViewAllList] = useState<any[]>([]);
  const [page, setPage] = useState<1 | 2>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAppList();
  }, []);

  const getAppList = async () => {
    try {
      setLoading(true);
      const data = await services.AiToolsController.toolSearchList();
      setList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} width={1000} footer={[]} onCancel={onCancel}>
      {page === 1 && (
        <>
          <Typography.Title style={{ marginBottom: 16 }} level={4}>
            应用商店
          </Typography.Title>
          {list?.map?.((item) => {
            return (
              <>
                {' '}
                <Flex
                  justify="space-between"
                  align="center"
                  style={{ marginBottom: 16 }}
                >
                  <Typography.Title level={5}>{item.category}</Typography.Title>
                  <Button
                    type="link"
                    onClick={() => {
                      setViewAllList(item.appList);
                      setPage(2);
                    }}
                  >
                    查看全部
                  </Button>
                </Flex>
                <Row gutter={[8, 8]}>
                  {item?.appList?.slice(0, 6)?.map?.((item) => {
                    return (
                      <AppItem
                        info={item}
                        onClicked={onClicked}
                        onCancel={onCancel}
                      ></AppItem>
                    );
                  })}
                </Row>
              </>
            );
          })}
        </>
      )}

      {page === 2 && (
        <>
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: 16 }}
          >
            <Button
              type="link"
              onClick={() => {
                setPage(1);
              }}
            >
              {`< 返回`}
            </Button>
          </Flex>
          <Row gutter={[8, 8]}>
            {viewAllList?.map?.((item) => {
              return (
                <AppItem
                  info={item}
                  onClicked={onClicked}
                  onCancel={onCancel}
                ></AppItem>
              );
            })}
          </Row>
        </>
      )}
    </Modal>
  );
};

const AppItem = ({
  info,
  onClicked,
  onCancel,
}: {
  info: any;
  onClicked: () => void;
  onCancel: () => void;
}) => {
  return (
    <Col span={8} key={info.remark}>
      <Card
        title={info.title}
        bordered={false}
        hoverable
        onClick={async () => {
          try {
            await services.AiToolsController.toolAdd({ id: info?.id });
			onCancel()
            onClicked();
          } catch (error) {}
        }}
      >
        {info.remark}
      </Card>
    </Col>
  );
};
