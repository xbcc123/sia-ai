import { useLocation } from '@umijs/max';
import { useEffect } from 'react';

export const useLocationPathName = ({
  menus,
  changeCheckedStatus,
}: {
  menus: any;
  changeCheckedStatus: any;
}) => {
  const location = useLocation();

  useEffect(() => {
    const index = menus.findIndex((item: any) =>
      location.pathname.includes(item.url)
    );
    if (index !== -1) {
      changeCheckedStatus(index);
    }
  }, [location.pathname]);

};
