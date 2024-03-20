import { ATag } from '@/components/Tag/ATag';
import {Tag, Tooltip} from 'antd';
import {ReactNode} from 'react';


// 账号管理
export const ImgStatus = ({ info }: { info?: any }) => {
	if(!info) {
		return <></>
	}
	const statusMap: {
	  [key: string]: ReactNode 
	} = {
	  NOT_START: (
		<ATag type="sucess" >
		  未启动
		</ATag>
	  ),
	  SUBMITTED: (
		<ATag type="sucess" >
		  已提交
		</ATag>
	  ),
	  IN_PROGRESS: (
		<ATag type="default" >
		  执行中 {info.progress}
		</ATag>
	  ),
	  FAILURE: (
		<ATag type="error" >
		  执行失败
		</ATag>
	  ),
	  SUCCESS: (
		<ATag type="sucess" >
		  完成
		</ATag>
	  ),
	};
	const node = statusMap?.[info?.status]
	return (
	  <Tooltip
		title={
		  <>
			<div>任务ID: {info?.id}</div>
			{/* <div>状态: 任务绘制完成</div> */}
			<div>积分: 消耗{info?.cost}</div>
		  </>
		}
	  >{node}</Tooltip>
	);
  };
  