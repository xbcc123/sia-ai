import services from '@/services/ai';
import { removeBase64Prefix } from '@/utils/index';
import { Form } from 'antd';
import { useEffect } from 'react';
import useStyles from './index.module.style';
import {SingleImg} from './components/SingleImg';
import {SingleImgToText} from './components/SingleImgToText';
import {ImgChangeStyle} from './components/ImgChangeStyle';

export const toolsMap: {
  [x: string]: any;
} = {
  1: {
    id: 1,
    name: '一键抠图',
    tpl: 'singleImgTpl',
    api: 'generalSegment',
    finish: 'finishFn1',
  },
  2: {
    id: 2,
    name: '老照片修复',
    tpl: 'singleImgTpl',
    api: 'convertPhoto',
    finish: 'finishFn1',
  },
  3: {
    id: 3,
    name: '图片配文',
    tpl: 'singleImgToTextTpl',
    api: 'poemMaterial',
    finish: 'finishFn1',
  },
  4: {
    id: 4,
    name: '图片风格转换',
    tpl: 'imgChangeStyle',
    api: 'styleConversion',
    finish: 'finishFn1',
  },
};

export const finishFnMap: {
  [x: string]: any;
} = {
  finishFn1: async (values: any, info: any) => {
    const imgRes = values?.imageBase64?.[0]?.response;
    const baseImg = removeBase64Prefix(imgRes);
	delete values?.imageBase64
    let params = {
      imageBase64: baseImg,
	  ...values
    };
    try {
      const data = await (services.AiToolsController as any)[
        toolsMap[info?.id]?.api
      ](params);
	  return data
    } catch (error) {
	  return {}
    }
  },
};

export default ({ info }: { info: any }) => {
  const { styles } = useStyles();

  const renderTplMap: {
    [x: string]: any;
  } = {
    singleImgTpl: <SingleImg info={info}></SingleImg>,
	singleImgToTextTpl: <SingleImgToText info={info}></SingleImgToText>,
	imgChangeStyle: <ImgChangeStyle info={info}></ImgChangeStyle>
  };

  return (
    <div className={styles.contanir}>
      {renderTplMap[toolsMap[info?.id].tpl]}
    </div>
  );
};
