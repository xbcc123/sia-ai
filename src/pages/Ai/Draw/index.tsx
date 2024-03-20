import { useRef, useState } from 'react';
import { DrawConfig } from './components/DrawConfig';
import { DrawContent } from './components/DrawContent';
import useStyles from './index.module.style';

export default () => {
  const { styles } = useStyles();
 const drawContentRef = useRef<{
	paginationRef: { current: { current: number; }; },
	getDrawList: () => Promise<any>
	setDrawList: (val: any) => void
 }>()
  
  return (
    <div className={styles.contanir}>
      <DrawConfig onSubmit={async (data) => {
		if(!data) {
			return 
		}
		if(drawContentRef.current) {
			drawContentRef.current.paginationRef.current.current = 1
			try {
				const result: any = await drawContentRef.current.getDrawList()
				drawContentRef.current.setDrawList([data].concat(result?.records?.slice?.(0, -1)))
			} catch (error) {
				
			}
		}
	  }}></DrawConfig>
      <DrawContent ref={drawContentRef}></DrawContent>
    </div>
  );
};
