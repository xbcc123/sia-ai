import { Empty } from '@/components/Empty/index';
import services from '@/services/ai';
import { isLogin } from '@/utils';
import { Col, FloatButton, Input, Pagination, Row } from 'antd';
import { useTheme } from 'antd-style';
import {
	CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DrawImgItem } from '../DrawImgItem';
import { IDrawImgItem } from '../DrawImgItem/index';
import { SenceModal } from '../SenceModal/index';
import useStyles from './index.module.style';
import { throttle } from 'lodash';

let targetElement: any = null
let resizeObserver: any = null
export const DrawContent = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
    return {
      paginationRef,
      getDrawList,
      setDrawList,
    };
  });

  const { styles } = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [drawList, setDrawList] = useState<Partial<IDrawImgItem>[]>([]);
  const [senceModalOpen, setSenceModalOpen] = useState<boolean>(false);
  const [ColStyle, setColStyle] = useState<CSSProperties>({
    width: '40%',
  });
  const token = useTheme();
  const paginationRef = useRef({
    current: 1,
    size: 12,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    initObserver();
    getDrawList();
	return () => {
		resizeObserver.unobserve(targetElement);
	}
  }, []);

  // 创建一个节流处理的回调函数
const throttledHandleResize = throttle((newWidth) => {
	if (newWidth <= 480) {
	  setColStyle({
		width: "100%",
	  });
	} else if (newWidth > 480 && newWidth <= 700) {
	  setColStyle({
		width: "50%",
	  });
	} else if (newWidth > 700 && newWidth <= 1050) {
	  setColStyle({
		width: "33.333%",
	  });
	} else if (newWidth > 1050 && newWidth <= 1200) {
	  setColStyle({
		width: "25%",
	  });
	} else if (newWidth > 1200) {
	  setColStyle({
		width: "20%",
	  });
	}
  }, 600); 

  const initObserver = () => {
    // 获取要监听的元素
    targetElement = document.getElementById('AiDrawContentId123');
    // 创建一个 ResizeObserver 实例
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // entry 包含目标元素的尺寸信息
		const newWidth = entry.contentRect.width;
	    throttledHandleResize(newWidth);
        // 在这里执行相应的逻辑，例如更新UI或触发特定操作
        // console.log(`新的宽度: ${newWidth}px`);
      }
    });
    // 启动 ResizeObserver 监听目标元素
    resizeObserver.observe(targetElement);
  };


  const getDrawList = async () => {
    if (!isLogin()) {
      return;
    }
    try {
      const data = await services.DrawController.taskSearchList({
        ...paginationRef.current,
        ...{
          condition: {
            keyword: searchValue,
          },
        },
      });
      if (data.records.length === 0 && data.total > 0) {
        paginationRef.current.current = 1;
        getDrawList();
        return;
      }
      setDrawList(data.records);
      setTotal(data.total);
      return data;
    } catch (error) {
      return [];
    }
  };

  return (
    <div className={styles.contanir} id="AiDrawContentId123">
      <Input.Search
        placeholder="输入关键字搜索您的创意"
        allowClear
        style={{
          marginBottom: 8,
        }}
        value={searchValue}
        enterButton="搜索"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onSearch={(value: any) => {
          getDrawList();
        }}
      />
      {drawList.length > 0 ? (
        <>
          <div className={styles.imgList}>
            <Row gutter={[16, 16]}>
              {drawList?.map?.((item: any) => {
                return (
                  <Col key={item?.id} style={ColStyle}>
                    <DrawImgItem
                      key={item?.id}
                      infoSource={item}
                      onSubmit={async ({ data }) => {
                        paginationRef.current.current = 1;
                        const result: any = await getDrawList();
                        setDrawList(
                          [data].concat(result?.records?.slice?.(0, -1)),
                        );
                      }}
                      onChangeState={() => {
                        getDrawList();
                      }}
                      onDelete={() => {
                        getDrawList();
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
          <div style={{ alignSelf: 'flex-end', padding: '16px' }}>
            <Pagination
              current={paginationRef.current.current}
              pageSize={paginationRef.current.size}
              total={total}
              showSizeChanger
              onChange={(page, pageSize) => {
                paginationRef.current.current = page;
                paginationRef.current.size = pageSize;
                getDrawList();
              }}
            />
          </div>
        </>
      ) : (
        <Empty text={'您还没有创建过绘画～'}></Empty>
      )}
      <FloatButton
        onClick={() => {
          setSenceModalOpen(true);
        }}
        style={{ bottom: 100, right: 30, width: 50, height: 50 }}
        type="primary"
        description={'场景'}
      />

      <SenceModal
        open={senceModalOpen}
        onClicked={(appItem) => {
          setSenceModalOpen(false);
        }}
        onCancel={function (): void {
          setSenceModalOpen(false);
        }}
      ></SenceModal>
    </div>
  );
});
