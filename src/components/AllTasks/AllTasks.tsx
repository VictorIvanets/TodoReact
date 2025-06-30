import './alltasks.sass'
import { memo, useEffect } from 'react'
import { Preloader } from '../preloaders/PreloaderBall'
import TaskList from '../../features/TaskList'
import { checkFuture } from '../../features/TaskCard/getTimeSpan'
import Flex from '../Flex/Flex'
import { helperNowTask } from './helperTask'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from 'src/store/store'
import { useStorage } from 'src/context/StorageContext'
import { getAllTask } from 'src/store/thunks/getAllTaskThunk'

const AllTasks = memo(() => {
	const {
		alltask,
		loading,
		errorMessege: errorMassege,
	} = useSelector((state: RootState) => state.alltask)
	const { storageType } = useStorage()

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(getAllTask())
	}, [dispatch, storageType])

	return (
		<>
			{errorMassege && <h1>{errorMassege}</h1>}

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
