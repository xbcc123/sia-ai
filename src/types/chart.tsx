export interface IChatModel {
  id: number | string;
  /* 名称 */
  name: string;
  /* KEY值 */
  key: string;
  /* 别名 */
  alias: string;
  /* token */
  token: number;
  /* 是否开启 1 是 0 否 */
  open: number;
  /* 排序 */
  sort: number;
  /* 消耗积分 */
  integral: number;
  /* 是否属于自定义配置 0 否 1 是 */
  custom: number;
}
