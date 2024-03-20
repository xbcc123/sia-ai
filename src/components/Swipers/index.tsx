// import Swiper JS
import { useEffect } from 'react';
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';
import styles from './index.scss';

export const Swipers = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

    });
  }, []);

  return (
    <>
      <div className="swiper">
        <div className="swiper-wrapper">
          <div className={`swiper-slide ${styles.item}`}>
            <img src={require('@/assets/images/img.png')} alt="" />
          </div>
          <div className={`swiper-slide ${styles.item}`}>Slide 2</div>
          <div className={`swiper-slide ${styles.item}`}>Slide 3</div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-scrollbar"></div>
      </div>
    </>
  );
};
