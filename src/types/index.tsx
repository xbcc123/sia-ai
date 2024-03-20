import { ATag } from '@/components/Tag/ATag';
import { ReactNode } from 'react';
export interface IUserInfo {
  avatar: string;
  email: string;
  isAdmin: 0 | 1;
  nickName: string;
  phone: string;
  userId: string;
}

//状态 NORMAL:正常 SIGN_IN:注册中 FREEZE:冻结
export enum IUserStateEnum {
  'NORMAL' = '正常',
  'SIGN_IN' = '注册中',
  'FREEZE' = '冻结',
}

// 绘画
export enum IDrawEnum {
  'IMAGINE' = '文生图',
  'BLEND' = '混图',
  'DESCRIBE' = '咒语解析',
}

// 订单状态
export enum IOrderStatusEnum {
  'UNPAY' = '未支付',
  'PAY' = '支付成功',
  'CANCEL' = '已取消',
}

// 绘画状态
export const drawStatusMap: {
  [key: string]: ReactNode;
} = {
  NOT_START: <ATag type="sucess">未启动</ATag>,
  SUBMITTED: <ATag type="sucess">已提交</ATag>,
  IN_PROGRESS: <ATag type="default">执行中</ATag>,
  FAILURE: <ATag type="error">执行失败</ATag>,
  SUCCESS: <ATag type="sucess">完成</ATag>,
};

// 初始化
export interface IGlobalInfo {
  setting: ApiData;
  userInfo: Partial<IUserInfo>;
  menusConfig: MenusConfig;
  protocolConfig: any;
  loginSetting: ILogin;
}

interface CustomItem {
  name: string;
  icon: string;
  action: string;
  value: string;
  hasLogin: boolean;
  open: boolean;
  sort: number;
  supportMobile: boolean;
}

interface MenusConfig {
  chatOpen: boolean;
  imageOpen: boolean;
  appOpen: boolean;
  galleryOpen: boolean;
  meOpen: boolean;
  senceOpen: boolean;
  customList: CustomItem[];
}

interface ApiData {
  domain: string;
  name: string;
  description: string;
  keyword: string;
  logo: string;
  footer: string;
  scoreIcon: string;
  scrollList: string[];
}

interface ButtonData {
  name: string;
  icon: string;
  action: string;
  value: string;
  hasLogin: boolean;
  open: boolean;
  sort: number;
}

// 登录信息
interface ILogin {
  expireDay: number;
  hasAuth: boolean;
  hasBindPhone: boolean;
  hasBindEmail: boolean;
  hasRegisterPhone: boolean;
  openPhone: boolean;
  openPhoneCode: boolean;
  hasRegisterEmail: boolean;
  openEmail: boolean;
}
