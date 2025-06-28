import { useState } from 'react'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { themeColor } from '../../sass/themeColor'
import { ToDoT } from '../../types/todo.types'
import { getTimeSpan } from './getTimeSpan'
import './taskcard.sass'
import { useDispatch } from 'react-redux'
import { alltaskActions } from 'src/slices/taskSlice'
import { categoryMock } from 'src/components/SubmitForm/components/allcategoryMock'

interface TaskCardProps {
	data: ToDoT
}

const TaskCard = ({ data }: TaskCardProps) => {
	const dateIso = new Date(data.dueDate)
	const [checkDel, setCheckDel] = useState<boolean>(false)
	const { date, featureBool } = getTimeSpan(data.dueDate)
	const categoryName = categoryMock.find((i) => i.id === data.categoryId)
	const dispatch = useDispatch()

	return (
		<Flex
			style={{ opacity: data.isCompleted ? 0.3 : undefined }}
			column
			spredV
			className="taskcard"
		>
			{checkDel && (
				<Flex center gap={20} className="taskcard__checkdel">
					<Button
						className="taskcard__btndelbox"
						appearence="small"
						title="cencel"
						onClick={() => setCheckDel(false)}
					/>
					<Button
						className="taskcard__btndelbox"
						appearence="small"
						title="delete"
						onClick={() => {
							dispatch(alltaskActions.deleteTaskById(data.id))
							setCheckDel(false)
						}}
					/>
				</Flex>
			)}
			<Flex centerV spredV className="taskcard__header">
				<h4>{categoryName?.categoryName}</h4>
				<Flex gap={5}>
					<Button
						className="taskcard__bthupdate"
						appearence="small"
						title="UPDATE"
						onClick={() => {
							dispatch(alltaskActions.getTaskForUpdateById(data.id))
						}}
					/>
					<Button
						className="taskcard__delete"
						appearence="small"
						title="DELETE"
						onClick={() => setCheckDel(true)}
					/>

					<Flex>
						<button
							onClick={() => dispatch(alltaskActions.setIsComplById(data.id))}
							className="taskcard__checkbox"
							title="set completed"
						>
							<p>{!data.isCompleted ? '☐' : '✔'}</p>
						</button>
					</Flex>
				</Flex>
			</Flex>
			<Flex className="taskcard__content" column spredV height={'100%'}>
				<p>
					<span>{dateIso.getDate()}</span>/<span>{dateIso.getMonth() + 1}</span>
					/<span>{dateIso.getFullYear()}</span>{' '}
					<span>{dateIso.getHours()}</span>:<span>{dateIso.getMinutes()}</span>
				</p>
				{!data.isCompleted ? (
					<h3> {data.myTask}</h3>
				) : (
					<h3>
						<s>{data.myTask}</s>
					</h3>
				)}
			</Flex>
			{!data.isCompleted ? (
				<Flex
					padding
					background={
						featureBool ? themeColor.$COLORGREEN : themeColor.$COLORRED
					}
				>
					<p style={{ color: themeColor.$COLORWHITE }}>{date}</p>
				</Flex>
			) : (
				<Flex padding>
					<p>Завершено</p>
				</Flex>
			)}
		</Flex>
	)
}

export default TaskCard
