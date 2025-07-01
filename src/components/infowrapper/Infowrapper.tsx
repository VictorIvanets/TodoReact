import { useEffect, useState } from 'react'
import './infowrapper.sass'
interface InfowrapperProps {
	children: React.ReactNode
}
const InfoWrapper = ({ children }: InfowrapperProps) => {
	const [onScreen, setOnScreen] = useState<boolean>(true)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setOnScreen(false)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	if (!onScreen) return null

	return (
		<div onClick={() => setOnScreen(false)} className="infowrapper">
			{children}
		</div>
	)
}

export default InfoWrapper
