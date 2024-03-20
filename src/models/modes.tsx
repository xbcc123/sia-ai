import React, { useEffect, useState } from 'react';
import services from '@/services/ai';
import {Consume} from '@/components/Consume';

export default () => {
	const [modeList, setmMdeList] = useState<any[]>([]);

	useEffect(() => {
	  getModalList()
	}, []);
  
	const getModalList = async () => {
	  try {
		  const data = await services.CommonController.configGpt()
		  const list = data.map((item: any) => {
			  return {
				...item,
				  label: <>{item.key}<Consume cost={item.cost}></Consume></>,
				  value: item.value,
				  key: item.value,
				  name: item.key
			  }
		  })
		  setmMdeList(list)
	  } catch (error) {
		  
	  }
	}
	
	return {
	  modeList,
	  setmMdeList
	};
};

