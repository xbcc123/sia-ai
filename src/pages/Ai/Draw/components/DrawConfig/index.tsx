import { MSlider } from '@/components/MSlider';
import { Segmented } from 'antd';
import { useState } from 'react';
import { MixedImage } from '../MixedImage';
import { SpellAnalysis } from '../SpellAnalysis';
import { TextToImg } from '../TextToImg';
import useStyles from './index.module.style';
import {useResponsive} from 'antd-style';
import { isMobile } from '@/utils';

export const DrawConfig = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const { styles } = useStyles();
  const [value, setValue] = useState<string | number>('文生图');
  const { mobile } = useResponsive();

  return (
    <MSlider defCollapsed={!isMobile()}
	width={300}>
      <div className={styles.contanir}>
        <Segmented
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
          options={['文生图', '混图', '咒语解析']}
        />
        {value === '文生图' && (
          <TextToImg
            onSubmit={function (data): void {
              onSubmit(data);
            }}
          ></TextToImg>
        )}
        {value === '混图' && (
          <MixedImage
            onSubmit={function (data): void {
              onSubmit(data);
            }}
          ></MixedImage>
        )}
        {value === '咒语解析' && (
          <SpellAnalysis
            onSubmit={function (data): void {
              onSubmit(data);
            }}
          ></SpellAnalysis>
        )}
      </div>
    </MSlider>
  );
};
