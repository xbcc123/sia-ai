import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import services from '@/services/admin';
import { useNavigate } from '@umijs/max';

export default () => {
	const navigate = useNavigate()
	const [result, setResult] = useState<any>({
		total: {},
		toady: {}
	})

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		try {
			const data = await services.PanelController.homeInfo()
			setResult(data)
		} catch (error) {
			
		}
	}

	const total = result?.total || {}
	const toady = result?.toady || {}

  return (
      <Row gutter={[8, 8]}>
        <Col xs={12} sm={6}>
          <Card size='small' hoverable onClick={() => {
				navigate('/admin/user/user')
			}}>
            <Statistic title="用户总数" value={total?.user}  />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/chat/chat')
			}}>
            <Statistic title="对话总数" value={total?.chat} />
          </Card>{' '}
        </Col>
        <Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/draw/draw')
			}}>
            <Statistic title="绘画总数" value={total?.image} />
          </Card>{' '}
        </Col>
        <Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/order')
			}}>
            <Statistic title="订单总数" value={total?.order} />
          </Card>{' '}
        </Col>
		<Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/user/user')
			}}>
            <Statistic title="今日新增用户" value={toady.user} />
          </Card>{' '}
        </Col>
		<Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/chat/chat')
			}}>
            <Statistic title="今日新增对话" value={toady.chat} />
          </Card>{' '}
        </Col>
		<Col xs={12} sm={6}>
          <Card size='small'  hoverable onClick={() => {
				navigate('/admin/draw/draw')
			}}>
            <Statistic title="今日新增绘画" value={toady.image} />
          </Card>{' '}
        </Col>
		<Col xs={12} sm={6}>
          <Card size='small' hoverable onClick={() => {
				navigate('/admin/order')
			}}>
            <Statistic title="今日新增订单" value={toady.order} />
          </Card>{' '}
        </Col>
      </Row>
  );
};
