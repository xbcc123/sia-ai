import { CusIcon } from '@/components/Icon/index';
import services from '@/services/ai';
import { EditOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { Col, Input, Row, Tooltip } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import useStyles from './index.module.style';
import { ATag } from '@/components/Tag/ATag';
import {useResponsive} from 'antd-style';

export default () => {
	const { mobile } = useResponsive();

  const { styles } = useStyles();
  const navigate = useNavigate();
  const [appList, setAppList] = useState<
    {
      id: number;
      name: string;
      key: string;
      icon: string;
      sort: number;
      active: boolean;
      show: boolean;
      appList: any[];
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    getAppList();
  }, []);

  const getAppList = async () => {
    try {
      const data = await services.AppController.appList();
      setLoading(false);
      data.forEach((item: any) => {
        item.active = false;
        item.show = true;
        item.appList.forEach((it: any) => {
          it.show = true;
        });
      });
      setAppList(data);
    } catch (error) {}
  };

  const goGenarate = (contetItem: any) => {
	navigate(`/ai/app-generate?id=${contetItem.id}`);
  }

  return (
    <div className={styles.contanir}>
      <Input.Search
        placeholder="请输入关键字搜索你想要的，Enter搜索"
        allowClear
        enterButton="搜索"
        onSearch={(value: any) => {
          appList.forEach((item) => {
            item.show = true;
            item.appList.forEach((it) => {
              it.show = false;
              if (it.name.includes(value)) {
                it.show = true;
              }
            });
            if (item.appList.filter((item) => item.show).length === 0) {
              item.show = false;
            }
          });
          setSearchValue(value);
          setAppList(_.cloneDeep(appList));
        }}
      />
      <div className={styles.appList}>
        {appList
          .filter((item) => item.show)
          ?.map?.((item, index) => {
            return (
              <div key={index}>
                <div
                  className={styles.appTitle}
                  onClick={() => {
                    appList[index].active = !appList[index].active;
                    setAppList([...appList]);
                  }}
                >
                  <CusIcon
                    icon={item.icon}
                    style={{ marginRight: 8, fontSize: 12 }}
                  ></CusIcon>
                  {/* <FontAwesomeIcon icon={item.icon} style={{ marginRight: 4, fontSize: 12 }} ></FontAwesomeIcon> */}
                  {item.name}
                  {item.active ? (
                    <RightOutlined
                      style={{
                        fontSize: 12,
                        marginLeft: 4,
                        transform: 'rotate(90deg)',
                        transition: 'all .3s',
                      }}
                    />
                  ) : (
                    <RightOutlined
                      style={{
                        marginLeft: 4,
                        fontSize: 12,
                        transition: 'all .3s',
                      }}
                    />
                  )}
                </div>
                <Row
                  className={styles.appContentList}
                  style={{ display: item.active ? 'none' : 'flex' }}
                  gutter={[8, 8]}
                >
                  {item.appList
                    .filter((contetItem) => contetItem.show)
                    ?.map?.((contetItem, contetIndex) => {
                      if (item.active) return <></>;
                      return (
                        <Col xs={12} sm={8} md={6} key={contetIndex}>
                          <div
                            className={classnames(
                              styles.appContent,
                              styles.appContentActive,
                            )}
                          >
                            <div className={styles.appContentIcon}>
                              <CusIcon icon={contetItem.icon}></CusIcon>
                              {/* <FontAwesomeIcon icon={contetItem.icon} style={{ fontSize: 12 }} ></FontAwesomeIcon> */}
                            </div>
                            <div className={styles.appContentRight}  onClick={() => {
								goGenarate(contetItem)
                            }}>
                              <div className={styles.appContetTitle}>
                                {contetItem.name}
                              </div>
                              <div
                                className={classnames(
                                  styles.appContentDes,
                                  'singleLine',
                                )}
                              >
                                <Tooltip title={contetItem.description}>
                                  {contetItem.description}
                                </Tooltip>
                              </div>
                            </div>
							{
								!mobile && <div
								className={`${styles.appContentTransformRight}`}
							  >
								<div onClick={() => {
									  localStorage.setItem('lastMenusKey', '1');
									  navigate(`/ai/chat`, {
										  state: contetItem
									  });
								}}>
								  <ATag pointer type='default' style={{marginRight: 2}}>添至对话</ATag>
								</div>
							  </div>
							}
                            
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              </div>
            );
          })}
      </div>
    </div>
  );
};
