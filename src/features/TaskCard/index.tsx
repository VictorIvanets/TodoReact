import { useState } from 'react'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { themeColor } from '../../sass/themeColor'
import { ToDoT } from '../../types/todo.types'
import { getTimeSpan } from './getTimeSpan'
import './taskcard.sass'
import { useDispatch, useSelector } from 'react-redux'
import { setIsComplitedThunk } from 'src/store/thunks/setIsComplitedThunk'
import { AppDispatch, RootState } from 'src/store/store'
import { deleteTaskThunk } from 'src/store/thunks/deleteTaskThunk'
import { getOneTaskThunk } from 'src/store/thunks/getOneTaskThunk'

interface TaskCardProps {
	data: ToDoT
}

const TaskCard = ({ data }: TaskCardProps) => {
	const { allCategory, errorMessege } = useSelector(
		(state: RootState) => state.category,
	)
	const categoryName =
		allCategory && allCategory.find((i) => i.id === data.categoryId)
	const dispatch = useDispatch<AppDispatch>()
	const dateIso = new Date(data.dueDate)
	const [checkDel, setCheckDel] = useState<boolean>(false)
	const { date, featureBool } = getTimeSpan(data.dueDate)

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
							console.log('CARD', data.id)
							dispatch(deleteTaskThunk({ id: data.id }))
							setCheckDel(false)
						}}
					/>
				</Flex>
			)}
			<Flex centerV spredV className="taskcard__header">
				<h4>{!errorMessege && categoryName && categoryName?.categoryName}</h4>
				<Flex gap={5}>
					<Button
						className="taskcard__bthupdate"
						appearence="small"
						title="UPDATE"
						onClick={() => {
							dispatch(getOneTaskThunk({ id: data.id }))
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
							onClick={() => dispatch(setIsComplitedThunk({ id: data.id }))}
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
