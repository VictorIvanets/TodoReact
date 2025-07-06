import { checkFuture } from 'src/features/TaskCard/getTimeSpan'
import { ToDoT } from 'src/types/todo.types'

export const helperNowTask = (tasks: ToDoT[]): ToDoT[] => {
	const allTask = tasks.filter((i) => !i.isCompleted && !checkFuture(i.dueDate))

	const newTask = allTask.filter((task) => new Date(task.dueDate) > new Date())

	const oldTask = allTask
		.filter((task) => new Date(task.dueDate) < new Date())
		.reverse()
	return [...newTask, ...oldTask]
}
