import { ReactNode } from 'react'
import './flex.sass'
import { themeColor } from '../../sass/themeColor'
type FlexProps = {
	children?: ReactNode
	className?: string
	row?: boolean
	column?: boolean
	spredV?: boolean
	spredH?: boolean
	center?: boolean
	centerH?: boolean
	centerV?: boolean
	padding?: boolean
	height?: number | string
	width?: number | string
	gap?: number
	background?: themeColor
} & React.HTMLAttributes<HTMLDivElement>

const Flex = ({
	children,
	className,
	row,
	column,
	spredV,
	spredH,
	center,
	centerH,
	centerV,
	height,
	width,
	style,
	background,
	padding,
	gap,
	...props
}: FlexProps) => {
	const styleFlex = {
		row: row ? 'flex-row' : undefined,
		column: column ? 'flex-column' : undefined,
		spredV: spredV ? 'flex-spredv' : undefined,
		spredH: spredH ? 'flex-spredh' : undefined,
		center: center ? 'flex-center' : undefined,
		centerH: centerH ? 'flex-centerh' : undefined,
		centerV: centerV ? 'flex-centerv' : undefined,
		padding: padding ? 'flex-pading' : undefined,
	}

	return (
		<div
			{...props}
			style={{
				...style,
				gap: gap ? gap : undefined,
				height: height ? height : undefined,
				width: width ? width : undefined,
				background: background ? (background as unknown as string) : undefined,
			}}
			className={`flex${Object.values(styleFlex)
				.join(' ')
				.replace(/\s+/g, ' ')}${className ? className : ''}`}
		>
			{children}
		</div>
	)
}

export default Flex
