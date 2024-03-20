import {useModel} from '@umijs/max';
// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

// 通过key获取mode
export const getModeFormModeList = (modelList: any[], key: string = '') => {
	return modelList?.find?.(item => item?.key === key)
}

// 通过value获取mode
export const getModeFormModeListAndValue = (modelList: any[], value: string = '') => {
	return modelList?.find?.(item => item?.value === value)
}

// 枚举转换成数组
export const convertedArray = (enumObject: any) => {
	return Object.entries(enumObject).map(([key, value]) => ({
		label: value ,
		value: key,
	  }));
}