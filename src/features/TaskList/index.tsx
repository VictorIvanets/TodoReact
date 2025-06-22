import { Dispatch, SetStateAction } from 'react'
import { ToDoT } from '../../types/todo.types'
import TaskCard from '../TaskCard'
import './tasklist.sass'

interface TaskListProps {
	data: ToDoT[]
	label?: string
	setIsComplById: (id: number) => void
	deleteTaskById: (id: number) => void
	setIdUpdate: Dispatch<SetStateAction<number | undefined>>
	fetchOneTask: (id: number | undefined) => void
}

const TaskList = ({
	data,
	label,
	setIsComplById,
	deleteTaskById,
	setIdUpdate,
	fetchOneTask,
}: TaskListProps) => {
	return (
		<div className="tasklistwrapper">
			<h4 className="tasklist__label">{label}</h4>
			<div className="tasklist">
				{data &&
					data.map((i) => (
						<TaskCard
							deleteTask={() => deleteTaskById(i.id)}
							setIsComplite={() => setIsComplById(i.id)}
							key={i.id}
							data={i}
							setIdUpdate={setIdUpdate}
							fetchOneTask={fetchOneTask}
						/>
					))}
			</div>
		</div>
	)
}

export default TaskList
