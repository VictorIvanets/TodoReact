import './alltasks.sass'
import { memo } from 'react'
import { Preloader } from '../preloaders/PreloaderBall'
import TaskList from '../../features/TaskList'
import { checkFuture } from '../../features/TaskCard/getTimeSpan'
import Flex from '../Flex/Flex'
import { helperNowTask } from './helperTask'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store/store'

const AllTasks = memo(() => {
	const { alltask, loading } = useSelector((state: RootState) => state.alltask)

	return (
		<>
			{loading ? (
				<Flex className="alltasks">
					<Preloader />
				</Flex>
			) : (
				<Flex className="alltasks">
					<TaskList
						label="Заплановані"
						data={alltask.filter(
							(i) => !i.isCompleted && checkFuture(i.dueDate),
						)}
					/>
					<TaskList label="В роботі" data={helperNowTask(alltask)} />
					<TaskList
						label="Архів"
						data={alltask.filter((i) => i.isCompleted).reverse()}
					/>
				</Flex>
			)}
		</>
	)
})

export default AllTasks
