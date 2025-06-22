import './alltasks.sass'
import { Dispatch, memo, SetStateAction, useEffect } from 'react'
import { Preloader } from '../preloaders/PreloaderBall'
import TaskList from '../../features/TaskList'
import { checkFuture } from '../../features/TaskCard/getTimeSpan'
import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { ToDoT } from '../../types/todo.types'
import { StorageType } from '../../types/storage.types'
import Flex from '../Flex/Flex'
import { helperNowTask } from './helperTask'

interface AllTasksProps {
	errorLayout: string | undefined
	loading: boolean
	allTask: ToDoT[]
	refetch: (
		variables?: Partial<OperationVariables> | undefined,
	) => Promise<ApolloQueryResult<any>>
	setIsComplById: (id: number) => void
	setIsCompleted: boolean
	deleteTaskById: (id: number) => void
	deleteTask: boolean
	addTask: ToDoT
	updateTask: ToDoT
	storageType: StorageType
	setIdUpdate: Dispatch<SetStateAction<number | undefined>>
}

const AllTasks = memo(
	({
		loading,
		allTask,
		refetch,
		setIsComplById,
		setIsCompleted,
		deleteTaskById,
		deleteTask,
		addTask,
		storageType,
		setIdUpdate,
		updateTask,
		errorLayout,
	}: AllTasksProps) => {
		useEffect(() => {
			errorLayout ?? refetch()
		}, [storageType, setIsCompleted, deleteTask, addTask, updateTask])

		return (
			<>
				{loading ? (
					<Flex className="alltasks">
						<Preloader />
					</Flex>
				) : (
					<Flex className="alltasks">
						<TaskList
							deleteTaskById={deleteTaskById}
							setIsComplById={setIsComplById}
							label="Заплановані"
							data={
								allTask &&
								allTask.filter((i) => !i.isCompleted && checkFuture(i.dueDate))
							}
							setIdUpdate={setIdUpdate}
						/>
						<TaskList
							deleteTaskById={deleteTaskById}
							setIsComplById={setIsComplById}
							label="В роботі"
							data={allTask && helperNowTask(allTask)}
							setIdUpdate={setIdUpdate}
						/>
						<TaskList
							deleteTaskById={deleteTaskById}
							setIsComplById={setIsComplById}
							label="Архів"
							data={allTask && allTask.filter((i) => i.isCompleted).reverse()}
							setIdUpdate={setIdUpdate}
						/>
					</Flex>
				)}
			</>
		)
	},
)

export default AllTasks
