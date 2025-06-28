import { ToDoT } from '../../types/todo.types'
import TaskCard from '../TaskCard'
import './tasklist.sass'

interface TaskListProps {
	data: ToDoT[]
	label?: string
}

const TaskList = ({ data, label }: TaskListProps) => {
	return (
		<div className="tasklistwrapper">
			<h4 className="tasklist__label">{label}</h4>
			<div className="tasklist">
				{data && data.map((i) => <TaskCard key={i.id} data={i} />)}
			</div>
		</div>
	)
}

export default TaskList
