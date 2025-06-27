import { getAllCategory } from '../../api/allCategory/useGetCategory.hook'
import { useAddNewTask } from '../../api/createTask/useCreateTask.hook'
import { useDeleteTask } from '../../api/deleteTask/useDeleteTask.hook'
import { getAllTasks } from '../../api/getAllTasks/useGetAllTask.hook'
import { useGetOneTask } from '../../api/getOneTask/useGetOneTask.hook'
import { useSetIsComplited } from '../../api/setIsComplited/useSetIsComplited.hook'
import { useUpdateTask } from '../../api/updateTask/useUpdateTask.hook'
import { useEffect, useState } from 'react'

export const useToDoApp = () => {
	const [errorLayout, setErrorLayout] = useState<string>()
	const { loadingCat, errorCat, allCategory } = getAllCategory()
	const { addNewTask, errorAdd, addTask, loadingAdd } = useAddNewTask()
	const { loading, error, allTask, refetch } = getAllTasks()
	const { setIsComplById, setIsCompleted, loadingSet, errorSet } =
		useSetIsComplited()
	const { deleteTaskById, deleteTask, loadingDel, errorDel } = useDeleteTask()
	const { fetchOneTask, oneTask, loadingOne } = useGetOneTask()
	const { updateTaskById, loadingUp, errorUp, updateTask } = useUpdateTask()

	useEffect(() => {
		error && setErrorLayout(error.message)
		errorCat && setErrorLayout(errorCat.message)
		errorAdd && setErrorLayout(errorAdd.message)
		errorSet && setErrorLayout(errorSet.message)
		errorDel && setErrorLayout(errorDel.message)
		errorUp && setErrorLayout(errorUp.message)
	}, [errorCat, errorAdd, error, errorSet, errorDel, errorUp])

	return {
		loadingCat,
		allCategory,
		addNewTask,
		addTask,
		loadingAdd,
		loading,
		allTask,
		refetch,
		setIsComplById,
		setIsCompleted,
		loadingSet,
		deleteTaskById,
		deleteTask,
		loadingDel,
		fetchOneTask,
		oneTask,
		loadingOne,
		updateTask,
		loadingUp,
		updateTaskById,
		errorLayout,
		errorAdd,
		errorUp,
	}
}
