import { CSSProperties, ReactNode } from "react"
import {createStyles} from 'antd-style';

const useStyles = createStyles(({token}, props: any) => {
	return {
		aTag: {
			display: 'flex',
			padding: '0px 6px',
			borderRadius: token.borderRadius,
			border: '1px solid',
			fontSize: 12,
			borderColor: props?.color ||  token.colorPrimary,
		}
	};
  });

export const CusTag = ({children, color, style, pointer}: { children: ReactNode, color?: string, style?: CSSProperties, pointer?: boolean }) => {
	const { styles } = useStyles({color});
	return <div className={styles.aTag} style={{ ...{ cursor: pointer ? 'pointer': 'initial'}, ...style}}>
		{children}
	</div>
}