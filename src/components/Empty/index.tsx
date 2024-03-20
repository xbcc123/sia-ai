import { useModel } from "@umijs/max"
import { useTheme } from "antd-style"
import { CSSProperties, ReactNode } from "react"

export const Empty = ({text, style}: {text: string | ReactNode, style?: CSSProperties}) => {
	const token = useTheme()
	const { initialState } = useModel("@@initialState")
	const { setting } = initialState
	
	return  <div
	style={{
	  flex: 1,
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	  justifyContent: 'center',
	  background: token.colorBgBase,
	  ...style
	}}
  >
	<img
	  style={{ width: '20%', objectFit: 'contain' }}
	  src={ setting?.placeholderImage ? `${setting.domain}${setting?.placeholderImage}` : ""}
	  alt=""
	/>
	<div style={{ marginTop: 16, color: token.colorTextDescription }}>
	  {text}
	</div>
  </div>
}