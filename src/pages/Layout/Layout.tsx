import './layout.sass'
import { memo } from 'react'
import Flex from '../../components/Flex/Flex'
import Header from '../../components/Header/Header'
import SubmitForm from '../../components/SubmitForm/SubmitForm'
import AllTasks from 'src/components/AllTasks/AllTasks'

const Layout = memo(() => {
	return (
		<Flex className="layout" column>
			<Flex className="layout__head" gap={20}>
				<SubmitForm />
				<Header />
			</Flex>
			<Flex className="layout__taskwrapper">
				<AllTasks />
			</Flex>
		</Flex>
	)
})

export default Layout
