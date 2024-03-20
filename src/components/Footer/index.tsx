import { CSSProperties, ReactNode } from "react"
import {createStyles} from 'antd-style';
import {useModel} from '@umijs/max';

const useStyles = createStyles(({token}, props: any) => {
	return {
		footer: {
		}
	};
  });

export const AFooter = ({children, style,}: { children?: ReactNode, style?: CSSProperties}) => {
	const { styles } = useStyles();
	const { initialState } = useModel("@@initialState")
	const { setting } = initialState
	return <div className={styles.footer} style={{ ...{}, ...style}}>
		<div>{setting?.footer}</div>
		{children}
	</div>
}