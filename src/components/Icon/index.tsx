import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'react';
import { MyIcon } from '../MyIcon';


export const CusIcon = ({fontIconProps, icon, style, className}: {
	fontIconProps?: Partial<FontAwesomeIconProps>;
	icon: any;
	style?: CSSProperties
	className?: string
}) => {
	let resultIcon = icon
	if(icon?.includes?.('fa')) {
		resultIcon = <FontAwesomeIcon icon={icon} {...fontIconProps}></FontAwesomeIcon>
	}
	if(icon?.includes?.('icon-')) {
		resultIcon = <MyIcon type={icon} {...fontIconProps}></MyIcon>
	}
	return <span className={className} style={style}>{resultIcon}</span>
}