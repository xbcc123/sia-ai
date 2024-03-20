import services from '@/services/admin';
import { useEffect, useState } from 'react';

export const useChatModelList = () => {
  const [chatModelList, setChatModelList] = useState<any[]>([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const data = await services.ChatController.modelList();
      const list = data.map((item: any) => {
        return {
          ...item,
          label: item.alias,
          value: item.name,
          key: item.name,
        };
      });
      setChatModelList(list);
    } catch (error) {}
  };

  return chatModelList;
};
