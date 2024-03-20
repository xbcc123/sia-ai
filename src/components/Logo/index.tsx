import { useModel } from '@umijs/max';

export const Logo = () => {
  const { initialState } = useModel('@@initialState');
  const { setting } = initialState;
  const logo = setting?.logo ? `${setting?.domain}${setting?.logo}` : '';
  return <img src={logo} alt="" />;
};
