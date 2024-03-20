import services from '@/services/ai';
import { useNavigate, useResponsive } from '@umijs/max';
import { Button, Card, Input, Space, Table, Typography, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import useStyles from './index.module.style';

export default () => {
  const { styles } = useStyles();
  const [dataSource, setDataSource] = useState([]);
  const { mobile } = useResponsive()
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const paginationRef = useRef<{
	current: number,
	size: number
  }>({
	current: 1,
	size: 10
  })

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = async () => {
    try {
      const data = await services.VipController.userMyList({...paginationRef.current});
      setDataSource(data.records);
	  setTotal(data.total)
    } catch (error) {}
  };

  const tableFontSize = mobile ? 12 : 14

  return (
    <div className={styles.container}>
      <Card title={<div style={{fontSize: 16}}>套餐管理</div>}>
        <Space wrap style={{justifyContent: 'space-between', width: '100%'}}>
          <Space>
            {/* <Button
              onClick={() => {
                getDataSource();
              }}
            >
              刷新
            </Button> */}
            <Button
			  type='primary'
              onClick={() => {
                navigate('/ai/me/product');
              }}
            >
              增加次数
            </Button>
          </Space>
		  <Input.Search
            placeholder="请输入兑换码"
			style={{width: 300}}
            enterButton={'兑换'}
            onSearch={async (e) => {
              try {
                await services.VipController.exchangeCode({
                  code: e,
                });
                message.success('兑换成功');
                getDataSource();
              } catch (error) {}
            }}
          ></Input.Search>
        </Space>
        <Table
          size="small"
		  rowKey={"id"}
		  scroll={{x: true}}
          style={{ marginTop: 24, fontSize: tableFontSize }}
          columns={[
            {
              title: <div style={{fontSize: tableFontSize}}>名称/类型</div>,
              dataIndex: 'name',
              key: 'name',
              render: (text: string, record: any) => {
                return (
                  <div style={{fontSize: tableFontSize}}>
					<div>{record.name}</div>
                    <div>{record.category}</div>
                  </div>
                );
              },
            },
			// {
			// 	title: '套餐类型',
			// 	dataIndex: 'category',
			// 	key: 'category',
			//   },
			{
				title: <div style={{fontSize: tableFontSize}}>积分-总/剩余/已用</div>,
				dataIndex: 'integral',
				key: 'integral',
				render: (text: string, record: any) => {
					return (
					  <div style={{fontSize:tableFontSize}}>
						<div>{record.integral}</div>
						<div>
						<Typography.Text type="success">{record.remain}</Typography.Text></div> 
						<div>{record.used}</div>
					  </div>
					);
				  },
			  },
            // {
            //   title: '总积分',
            //   dataIndex: 'integral',
            //   key: 'integral',
            // },
			// {
			// 	title: '剩余积分',
			// 	dataIndex: 'remain',
			// 	key: 'remain',
			//   },
			//   {
			// 	title: '已用积分',
			// 	dataIndex: 'used',
			// 	key: 'used',
			//   },
			  {
				title:<div style={{fontSize: tableFontSize}}>过期</div>,
				dataIndex: 'isExpire',
				key: 'isExpire',
				render: (text) => <div style={{fontSize: tableFontSize}}>{text === 1? <Typography.Text type="success">是</Typography.Text> : <Typography.Text type="danger">否</Typography.Text>}</div>
			  },
			  {
				title: <div style={{fontSize: tableFontSize}}>上次重置时间/有效期</div>,
				dataIndex: 'resetTime',
				key: 'resetTime',
				render: (text: string, record: any) => {
					return (
					  <div style={{fontSize: tableFontSize}}>
						<div>上次重置：{record.resetTime || '-'}</div>
						<div>有效期：{record.startTime}-{record.endTime}</div> 
					  </div>
					);
				  },			  
				},
            // {
            //   title: '上次重置时间',
            //   dataIndex: 'resetTime',
            //   key: 'resetTime',
            //   render: (text: string, record: any) => {
            //     return <>{text ? text : '-'}</>;
            //   },
            // },
            // {
            //   title: '有效期',
            //   dataIndex: 'endTime',
            //   key: 'endTime',
            //   render: (text: string, record: any) => {
            //     return (
            //       <>
            //         {record.startTime}-{record.endTime}
            //       </>
            //     );
            //   },
            // },
          ]}
          dataSource={dataSource}
		  pagination={{
			total,
			pageSize: paginationRef.current.size, 
			onChange:(page, pageSize) => {
				paginationRef.current = {
					current: page,
					size: pageSize
				}
				getDataSource()
			}
		  }}
        ></Table>
      </Card>
    </div>
  );
};
