import {MyIcon} from '@/components/MyIcon';
import { useModel } from '@umijs/max';
import { CusIcon } from '../Icon';

export const Consume = ({cost}: {cost: number}) => {
	const { initialState } = useModel("@@initialState")
	const { setting } = initialState
	return <><span style={{marginLeft: 8}}>(<CusIcon icon={setting?.scoreIcon || '✨'}></CusIcon>{cost})</span> </>
}