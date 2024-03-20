import { ImgModal } from '@/components/ImgModel';
import services from '@/services/ai';
import { Button } from 'antd';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import useStyles from './index.module.style';
import { useModel } from '@umijs/max';
import { getMiniImgUrl } from '@/utils';

export interface ImgType {
  id: string;
  avatar: string;
  imageUrl: string;
  miniUrl: string | null;
  nickName: string;
  prompt: string;
  promptEn: string;
  createTime: number;
}

export default () => {
  const [images, setImages] = useState<ImgType[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { styles } = useStyles();
  const [imgModalVisible, setImgModalVisible] = useState(false);
  const paginationRef = useRef({
    current: 1,
    size: 12,
  });
  const [drawItem, setDrawItem] = useState({});
  const { initialState } = useModel("@@initialState")

  const handleSearchImage = async () => {
    paginationRef.current.current++;
    getData((data) => {
      if (data.length === 0) {
        setLoaded(true);
        return;
      }
      setImages([...images].concat(data));
    });
  };

  useEffect(() => {
    getData((data) => {
      setImages(data);
    });
  }, []);

  const getData = async (cb: (val: any[]) => void) => {
    try {
      const data: any = await services.GalleryController.gallerySearchList({
        ...paginationRef.current,
      });
      cb(data.records);
    } catch (error) {}
  };

  return (
    <div className={styles.contanir}>
      <div className={styles.imgList}>
        {images?.map?.((item) => {
          return (
            <div
              className={styles.imgItem}
              key={item?.id}
              onClick={() => {
                setDrawItem(item);
                setImgModalVisible(true);
              }}
            >
              <img src={getMiniImgUrl(item?.miniUrl, initialState?.setting?.domain) || ''} />
              <div className={styles.imgItemContent}>
                <div className={styles.itemContetTop}>
                  <div>{item.nickName}</div>
                  {/* <div>6天内</div> */}
                  <div>
                    {moment(item.createTime).fromNow()}
                  </div>
                </div>
                <div className={styles.itemContetText}>{item.prompt}</div>
              </div>
            </div>
          );
        })}
      </div>
      {!loaded && (
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={() => handleSearchImage()}
            style={{ margin: '30px auto' }}
          >
            加载更多
          </Button>
        </div>
      )}

      <ImgModal
        imgModalVisible={imgModalVisible}
        info={drawItem}
        onClose={() => {
          setImgModalVisible(false);
        }}
      ></ImgModal>
    </div>
  );
};
