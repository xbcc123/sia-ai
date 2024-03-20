import services from '@/services/ai';
import {Button, Card, Col, Modal, Radio, Row, Spin, Statistic, message, theme, notification} from 'antd';
import BigNumber from 'bignumber.js';
import {useEffect, useRef, useState, ReactNode} from 'react';
import servicesMain from '@/services/main'
import useStyles from './index.module.style';
import { Tip } from '@/components/Tip';

interface IPayItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  description: string;
  expireDay: number;
  integral: number;
  eachDay: boolean;
}

export default () => {
  const [payTypeChecked, setPayTypeChecked] = useState<'aliPay' | 'wxPay'>('aliPay');
  const [payVisible, setPayVisible] = useState(false);
  const [payList, setPayList] = useState([]);
  const [payItem, setPayItem] = useState<Partial<IPayItem>>({});
  const [payImgVisible, setPayImgVisible] = useState(false);
  const [payResult, setPayResult] = useState<{base64: string, orderId?: number}>({base64: ''});
  const { token } = theme.useToken();
  const { styles } = useStyles();
  const [payOptions, setPayOptions] = useState<any[]>([])
  const [payConfig, setPayConfig] = useState<any>({})
  const [payLoading, setPayLoading] = useState<boolean>(false)
  const payTimerRef = useRef<any>(null)

  useEffect(() => {
    getPkgList();
	getPayConfig()

	return () => {
		clearInterval(payTimerRef.current)
	}
  }, []);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({message, description}: {
	message: ReactNode, 
	description: ReactNode
  }) => {
    api.info({
	  duration: null,
      message,
      description,
      placement: 'topRight',
    });
  };

  const getPayConfig = async () => {
	try {
		let options: any[] = []
		const data = await servicesMain.CommonController.getSettingPay();
		if(data.hasAliPay) {
			options.push({
				label: '支付宝',
				value: 'aliPay'
			})
		}
		if(data.hasWxPay) {
			options.push({
				label: '微信支付',
				value: 'wxPay'
			})
		}
		setPayTypeChecked(options?.[0]?.value || 'aliPay')
		setPayConfig(data)
		setPayOptions(options);
		openNotification({
			message: <span>套餐公告</span>,
			description: <div dangerouslySetInnerHTML={{__html: data?.content || ""}}></div>
		})
	} catch (error) {
		
	}
  }

  const getPkgList = async () => {
	try {
		const data = await services.VipController.packageList();
		setPayList(data);
	} catch (error) {
		
	}

  };

  const handleBuy = (item: any) => {
    setPayItem(item);
    setPayVisible(true);
  };

  const discountPrice = ({ price = 1, discount = 1 }: Partial<IPayItem>) => {
    return new BigNumber(price).multipliedBy(discount).toNumber();
  };

  const getPayInfo = async ({orderId}: any) => {
		try {
			const data = await services.VipController.orderState({orderId}) 
			return data
		} catch (error) {
			return {}
		}
  }

  const loopGetPayInfo = (orderInfo: any) => {
		payTimerRef.current = setInterval(async () => {
			const data = await getPayInfo(orderInfo)
			if(data === 'PAY') {
				clearInterval(payTimerRef.current)
				message.success('支付成功')
			}
		}, 1000)
  }

  return (
    <div className={styles.container} style={{
		height: token.headerHeight
	}}>
		{contextHolder}
      <Card title={<div level={5} style={{fontSize: 16}}>套餐商店</div>}>
		{/* {payConfig?.content && <Tip title={<>套餐公告</>} des={<div dangerouslySetInnerHTML={{__html: payConfig?.content}}></div>}></Tip>} */}
		{payConfig?.stop && <Tip title={payConfig?.stopPrompt} des={<></>}></Tip>}
        <Row gutter={[16, 16]} style={{ marginTop: 0 }}>
          {payList?.map((item: any) => {
            return (
              <Col xs={24} sm={8} key={item.id}>
                <div className={styles.item}>
                  <div className={styles.itemTop}>
                    <div>{item.name}</div>
                    <div>
                      {item.discount < 1 && (
                        <span
                          style={{
                            textDecoration: 'line-through',
                            fontSize: 12,
                            color: 'red',
                          }}
                        >
                          ￥{item.price}
                        </span>
                      )}{' '}
                      <span>￥{discountPrice(item)}</span>{' '}
                    </div>
                  </div>
                  {item.eachDay ? (
                    <>
                      <div className={styles.itemPoints}>
                        {' '}
                        {/* <CheckOutlined style={{ marginRight: 8, color: 'green' }} /> */}
                        每日
						<span className={styles.itemActiveText} >{item.integral}</span>
						积分
                      </div>
                    </>
                  ): <>
				  <div className={styles.itemPoints}>
					{' '}
					{/* <CheckOutlined style={{ marginRight: 8, color: 'green' }} /> */}
					共
					<span className={styles.itemActiveText} >{item.integral}</span>
					积分
				  </div>
				</> }

                  <div className={styles.itemDay}>
                    {' '}
                    {/* <CheckOutlined style={{ marginRight: 8, color: 'green' }} /> */}
                    有效天数：
					<span className={styles.itemActiveText} >{item.expireDay}</span>
					天
                  </div>
                  <div className={styles.itemDes}>{item.description}</div>
				  {
					!payConfig.stop && <Button className={styles.itemPay} type="primary" onClick={() => handleBuy(item)}>
                    购买
                  </Button>
				  }
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>

      <Modal
        open={payVisible}
        cancelText="取消"
        okText="生成支付码"
		title={payItem.name}
        onCancel={() => setPayVisible(false)}
		cancelButtonProps={{
			style: {
				display: 'none'
			}
		}}
		confirmLoading={payLoading}
        onOk={async () => {
			setPayLoading(true)
			try {
				let data: any = {}
				let pramas = {
					packageId: payItem.id
				}
				if(payTypeChecked === 'aliPay') {
					data = await services.VipController.alipayQrcode(pramas);
				}
				if(payTypeChecked === 'wxPay') {
					data = await services.VipController.wechatQrcode(pramas);
				}
				setPayLoading(false)
				setPayResult(data);
				loopGetPayInfo(data)
				setPayImgVisible(true);	
			} catch (error) {
				setPayLoading(false)
			}
        }}
      >
        <div className={styles.payModal}>
          {/* <div className={styles.payModalTitle}>
            <InfoCircleOutlined
              className={styles.payModalTitleIcon}
              style={{
                color: token.colorPrimary,
              }}
            />{' '}
            套餐购买
          </div> */}
          {/* <div className={styles.payModalName}>套餐名称：{}</div> */}
          {/* <div className={styles.payModalPrice}>价格：￥{discountPrice(payItem)}</div> */}
		  <Statistic
			title=""
			value={discountPrice(payItem)}
			valueStyle={{ color: 'red' }}
			prefix={"￥"}
			/>
          {/* <div className={styles.payModalType}>支付方式</div> */}
          <Radio.Group
		  	style={{
				marginTop: 12
			}}
            onChange={(e) => {
				setPayTypeChecked(e.target.value)
			}}
            value={payTypeChecked}
            options={payOptions}
          ></Radio.Group>
        </div>
      </Modal>

      <Modal
        open={payImgVisible}
        width={340}
        onCancel={() => setPayImgVisible(false)}
        footer={[]}
      >
        <div dangerouslySetInnerHTML={{__html: payConfig?.payPrompt || ''}}></div>
		{
			!payLoading ? <img src={payResult?.base64} alt="" />: <Spin></Spin>
		}
      </Modal>
    </div>
  );
};
