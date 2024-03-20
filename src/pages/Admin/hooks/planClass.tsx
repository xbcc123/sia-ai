import services from '@/services/admin';
import { useEffect, useState } from 'react';

export const usePlanClass = () => {
  const [planClass, setPlanClass] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await services.PlanController.categoryList({});
      setPlanClass(data?.map?.((item: any) => {
		return {
			...item,
			label: item.name,
			value: item.key
		}
	  }));
    } catch (error) {}
  };

  return { planClass, setPlanClass };
};
