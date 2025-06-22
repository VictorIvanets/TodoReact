import { FormEvent, memo, useCallback, useEffect, useState } from 'react'
import Button from '../Button/Button'
import Flex from '../Flex/Flex'
import './submitform.sass'
import { ApolloError } from '@apollo/client'
import { CategoryT } from '../../types/category.types'
import { AddTaskT, UpdateTaskT } from '../../types/createTask.types'
import { ToDoT } from '../../types/todo.types'

export type NewTaskForm = {
	inputdatatime: {
		value: string
	}
	textarea: {
		value: string
	}
	select: {
		value: string
	}
}

interface SubmitFormProp {
	loadingCat: boolean
	allCategory: CategoryT[]
	addNewTask: (addTask: AddTaskT) => void
	updateTaskById: (updateTask: UpdateTaskT) => void
	errorAdd: ApolloError | undefined
	errorUp: ApolloError | undefined
	taskForUpdate: ToDoT | undefined
	setIdUpdate: React.Dispatch<React.SetStateAction<number | undefined>>
	idUpdate: number | undefined
}

const SubmitForm = memo(
	({
		loadingCat,
		allCategory,
		addNewTask,
		errorAdd,
		taskForUpdate,
		updateTaskById,
		errorUp,
		setIdUpdate,
		idUpdate,
	}: SubmitFormProp) => {
		const [validate, setValidate] = useState<string>('')
		const [valueTask, setValueTask] = useState<string>('')
		const [valueTime, setValueTime] = useState<string>('')
		const [valueCategory, setValueCategory] = useState<number | ''>('')

		useEffect(() => {
			if (idUpdate) {
				setValueTask(taskForUpdate?.myTask ?? '')
				setValueTime(taskForUpdate?.dueDate ?? '')
				setValueCategory(taskForUpdate?.categoryId ?? '')
			}
		}, [taskForUpdate, idUpdate])

		const submit = useCallback(
			(event: FormEvent) => {
				const target = event.target as typeof event.target & NewTaskForm
				event.preventDefault()
				const { inputdatatime, textarea, select } = target
				if (textarea.value === '') setValidate('заповніть поле для задачі')
				else if (inputdatatime.value === '') setValidate('оберіть дату')
				else if (select.value === '') setValidate('оберіть категорію')
				else {
					addNewTask({
						task: textarea.value,
						dateTime: inputdatatime.value,
						categoryId: +select.value,
					})
					if (errorAdd) setValidate(errorAdd.message)
					else {
						setValueCategory('')
						setValueTask('')
						setValueTime('')
					}
				}
			},
			[addNewTask, errorAdd],
		)

		const update = useCallback(
			(event: FormEvent) => {
				const target = event.target as typeof event.target & NewTaskForm
				event.preventDefault()
				const { inputdatatime, textarea, select } = target
				if (textarea.value === '') setValidate('заповніть поле для задачі')
				else if (inputdatatime.value === '') setValidate('оберіть дату')
				else if (select.value === '') setValidate('оберіть категорію')
				else if (taskForUpdate) {
					updateTaskById({
						id: taskForUpdate?.id,
						task: textarea.value,
						dateTime: inputdatatime.value,
						categoryId: +select.value,
					})
					if (errorUp) setValidate(errorUp.message)
					else {
						setValueCategory('')
						setValueTask('')
						setValueTime('')
						setIdUpdate(undefined)
					}
				}
				return
			},
			[updateTaskById, errorUp, taskForUpdate],
		)

		const clear = useCallback(() => {
			setValueCategory('')
			setValueTask('')
			setValueTime('')
			setIdUpdate(undefined)
		}, [])

		return (
			<Flex className="submitformwraper">
				<form onSubmit={!taskForUpdate ? submit : update}>
					<Flex gap={10} centerV spredV className="submitform">
						<textarea
							onChange={(e) => {
								setValidate('')
								setValueTask(e.target.value)
							}}
							name="textarea"
							className="submitform__textarea"
							value={valueTask}
						></textarea>
						<Flex gap={5} column>
							<input
								onChange={(e) => {
									setValidate('')
									setValueTime(e.target.value)
								}}
								name="inputdatatime"
								className="inputdatatime"
								type="datetime-local"
								value={valueTime}
							/>
							<select
								onChange={(e) => {
									setValidate('')
									setValueCategory(+e.target.value)
								}}
								name="select"
								className="submitform__select"
								id="category-select"
								value={valueCategory}
							>
								<option disabled value="">
									{loadingCat ? 'loading...' : '--select category--'}
								</option>

								{allCategory &&
									allCategory.map((i) => (
										<option key={i.id} value={i.id}>
											{i.categoryName}
										</option>
									))}
							</select>
							{!idUpdate ? (
								<Button
									className="submitform__btn"
									appearence="big"
									title={'Submit'}
								/>
							) : (
								<Flex gap={3}>
									<Button
										className="submitform__btn"
										appearence="big"
										title={'Update'}
									/>
									<Button
										type="button"
										className="submitform__btn"
										appearence="big"
										title={'cancel'}
										onClick={() => clear()}
									/>
								</Flex>
							)}
						</Flex>
						{validate && (
							<Flex onClick={() => setValidate('')} className="validate">
								<p>{validate}</p>
							</Flex>
						)}
					</Flex>
				</form>
			</Flex>
		)
	},
)

export default SubmitForm
