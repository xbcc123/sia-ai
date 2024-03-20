import React, { useEffect, useState } from 'react';
import services from '@/services/admin';

export const useClassList = () => {
	const [classList, setClassList] = useState<any[]>([]);

	useEffect(() => {
	  getModalList()
	}, []);
  
	const getModalList = async () => {
	  try {
		  const data = await services.ClassController.searchList()
		  const list = data.map((item: any) => {
			  return {
				...item,
					label: item.name,
				  value: item.id,
				  key: item.id,
			  }
		  })
		  setClassList(list)
	  } catch (error) {
		  
	  }
	}
	
	return classList
};

