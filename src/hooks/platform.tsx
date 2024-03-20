import services from '@/services/admin';
import { useEffect, useState } from 'react';

export const usePlatformList = () => {
  const [platformList, setPlatformList] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const data = await services.ChatController.platformList();
      const list = data.map((item: any) => {
        return {
          ...item,
          label: item.value,
          value: item.key,
          key: item.value,
        };
      });
      setPlatformList(list);
    } catch (error) {}
  };

  return platformList;
};
