import services from '@/services/ai';
import {useNavigate, useSnapshot} from '@umijs/max';
import { Button, Col, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useStyles from './index.module.style';
import { ATag } from '@/components/Tag/ATag';
import { logo } from './modes/logo';
import { illustration } from './modes/illustration';
import { avatar } from './modes/avatar';
import { game } from './modes/game';
import { entity } from './modes/entity';
import { people } from './modes/people';
import { landscape } from './modes/landscape';
import { other } from './modes/other';
import { Tip } from '@/components/Tip';
import {SenceTypeMode} from '@/valtioStore/drawMode';
import {changeSence} from '@/valtioStore/drawMode';

export default ({onClicked}: {onClicked: (item: any) => void}) => {
  const { styles } = useStyles();
  const [senceList, setSenceList] = useState<
    {
      id: number;
      name: string;
      key: string;
      icon: string;
      sort: number;
      appList: SenceType[];
    }[]
  >([
	logo as any,
	illustration,
	avatar,
	game,
	entity,
	people,
	landscape,
	other,
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // getAppList();
  }, []);

  const getAppList = async () => {
    try {
		setLoading(true)
      const data = await services.SenceController.MJ_BASE_PROMPT();
      setLoading(false);
      setSenceList(data);
    } catch (error) {}
  };

  return (
    <div className={styles.contanir}>
	  <Tip style={{marginBottom: 0}} title={<>教程地址<Button type='link' onClick={() => {
		window.open('https://learningprompt.wiki/zh-Hans/docs/midjourney-learning-path')
	  }}>Learning Prompt</Button></>} des={''}></Tip>
      <div className={styles.appList}>
        {senceList?.map?.((senceItem) => {
          return (
            <div key={senceItem.name}>
              <div className={styles.appTitle} onClick={() => {}}>
                {senceItem.name}
              </div>
              <div className={styles.appContentList}>
                <Row className={styles.appContentList} gutter={[8, 8]}>
                  {senceItem.appList?.map?.((appItem: any, appIndex) => {
                    return (
                      <Col xs={12} sm={6} md={4} key={appIndex}>
                        <SenceItem onClicked={onClicked} key={appIndex} appItem={appItem}></SenceItem>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SenceItem = ({ appItem, onClicked }: { appItem: any, onClicked:(appItem: any) => void }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.appContent} onClick={() => {}}>
      <img src={appItem.url} />
      <div className={styles.appContentButtom}>
        <div>{appItem.sceneName}</div>
        <ATag
          pointer type='default'
          style={{ marginRight: 0 }}
          onClick={() => {
			changeSence({...appItem, ...{
				drawTypeFlag: true
			}})
			onClicked(appItem)
          }}
        >
          使用场景
        </ATag>
      </div>
    </div>
  );
};
