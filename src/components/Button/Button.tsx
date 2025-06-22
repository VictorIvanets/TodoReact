import { themeColor } from '../../sass/themeColor'
import './button.sass'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	appearence?: 'big' | 'small'
	background?: themeColor
	className?: string
}
export function Button({
	title,
	className,
	appearence = 'small',
	...props
}: ButtonProps) {
	return (
		<div
			className={`${className} btnbox ${
				appearence === 'big' ? 'big' : 'small'
			}`}
		>
			<button {...props}>
				<p>{title}</p>
			</button>
		</div>
	)
}

export default Button
