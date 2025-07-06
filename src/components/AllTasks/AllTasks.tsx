import './alltasks.sass'
import { memo, useEffect } from 'react'
import { Preloader } from '../preloaders/PreloaderBall'
import TaskList from '../../features/TaskList'
import Flex from '../Flex/Flex'
import { useStorage } from 'src/context/StorageContext'
import InfoWrapper from '../infowrapper/Infowrapper'
import { useGetAllTask } from '../../api/hooks/useGetAllTask'

const AllTasks = memo(() => {
	const { storageType } = useStorage()
	const { data, isError, error, isLoading, refetch } = useGetAllTask()

	useEffect(() => {
		refetch()
	}, [storageType])

	return (
		<>
			<Flex className="alltasks">
				{isLoading && (
					<InfoWrapper>
						<Preloader />
					</InfoWrapper>
				)}
				{isError && (
					<InfoWrapper>
						<Flex center className="alltasks__error">
							<h1>{error?.message}</h1>
						</Flex>
					</InfoWrapper>
				)}
				{!isLoading && !data?.length && (
					<InfoWrapper>
						<h1>Список задач порожній</h1>
					</InfoWrapper>
				)}
				{data && <TaskList label="Архів" data={[...data].reverse()} />}
			</Flex>
		</>
	)
})

export default AllTasks
