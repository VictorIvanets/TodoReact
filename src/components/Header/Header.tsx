import Flex from '../Flex/Flex'
import SelectStorage from '../SelectStorage/SelectStorage'
import './header.sass'
import Logo from '/todoListLogo.svg'

interface HeaderProps {}
const Header = ({}: HeaderProps) => {
	return (
		<>
			<Flex centerV className="header" gap={20}>
				<div className="header__logobox">
					<img className="header__logobox__logo" src={Logo} alt="logo" />
				</div>
				<Flex centerV column width={120} gap={5}>
					<p className="lightcolor tacenter">оберіть сховище</p>
					<SelectStorage />
				</Flex>
			</Flex>
		</>
	)
}

export default Header
