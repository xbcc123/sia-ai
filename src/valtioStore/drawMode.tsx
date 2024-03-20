import { proxy } from '@umijs/max';

// 场景配置
export let SenceTypeMode = proxy<SenceType>({
  config: {
    drawType: 'textToImg',
    drawTypeFlag: false,
    sceneName: '',
    sceneType: '',
    url: '',
    config: {},
  },
});

/**
 * @description: 改变场景配置flag
 * @param {boolean} flag 场景flag
 * @return {*}
 */
export const changeSenceFlag = (flag: boolean) => {
  SenceTypeMode.config.drawTypeFlag = flag;
};

/**
 * @description: 改变场景配置
 * @param {SenceType} sence 场景配置
 * @return {*}
 */
export const changeSence = (sence: SenceType) => {
  SenceTypeMode.config = sence;
};

// 创建相似配置
