import { useEffect, useState } from 'react';
import services from '@/services/ai';

export default () => {
	const [modeDrawList, setmMdeList] = useState<any[]>([]);

	useEffect(() => {
	  getModalList()
	}, []);
  
	const getModalList = async () => {
	  try {
		  const data = await services.CommonController.configMj()
		  setmMdeList(data)
	  } catch (error) {
		  
	  }
	}
	
	return {
	  modeDrawList,
	  setmMdeList
	};
};

