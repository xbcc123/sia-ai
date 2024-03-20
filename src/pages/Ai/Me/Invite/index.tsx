import services from '@/services/ai';
import { Card, Space, Table, Typography } from 'antd';
import {useEffect, useState, useRef} from 'react';
import useStyles from './index.module.style';

export default () => {
  const [dataSource, setDataSource] = useState([]);
  const [content, setContent] = useState('');
  const [total, setTotal] = useState(0);
  const paginationRef = useRef({
    current: 1,
    size: 12,
  });

  const { styles } = useStyles();

  useEffect(() => {
    getData();
    getDataSource();
  }, []);

  const getData = async () => {
    try {
      const data = await services.VipController.inviteInfo();
      setContent(data.content);
    } catch (error) {}
  };

  const getDataSource = async () => {
    try {
      const data = await services.VipController.inviteList({
		"current":1,
		"size":10
	  });
	  setTotal(total)
    //   setDataSource(data.records);
    } catch (error) {}
  };

  return (
    <Space direction="vertical" className={styles.container}>
      <Card title={<div style={{fontSize: 16}}>分享应用</div>}>
        <Typography.Paragraph>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </Typography.Paragraph>
	  </Card>
	  <Card title={<div style={{fontSize: 16}}>分享列表</div>}>
        <Table
          size="small"
          columns={[
            {
              title: '好友ID',
              dataIndex: 'userId',
              key: 'userId',
			  render: (text) => text || '-'
            },
            {
              title: '账号',
              dataIndex: 'email',
              key: 'email',
			  render: (text) => text || '-'
            },
            {
              title: '昵称',
              dataIndex: 'nickName',
              key: 'nickName',
			  render: (text) => text || '-'
            },
            {
              title: '邀请时间',
              dataIndex: 'createTime',
              key: 'createTime',
			  render: (text) => text || '-'
            },
          ]}
          dataSource={dataSource}
		  pagination={{
			current: paginationRef.current.current,
			pageSize: paginationRef.current.size,
			total,
			onChange: (page, pageSize) => {
                paginationRef.current.current = page;
                paginationRef.current.size = pageSize;
                getDataSource();
            }
		  }}
        ></Table>
      </Card>
    </Space>
  );
};
