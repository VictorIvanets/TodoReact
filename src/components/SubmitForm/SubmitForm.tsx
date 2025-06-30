import { FormEvent, memo, useCallback, useEffect, useState } from 'react'
import Button from '../Button/Button'
import Flex from '../Flex/Flex'
import './submitform.sass'
import { NewTaskFormT } from '../../types/createTask.types'
import { useStorage } from 'src/context/StorageContext'
import SelectCategory from './components/SelectCategory'
import { useDispatch, useSelector } from 'react-redux'
import { alltaskActions } from 'src/store/slices/taskSlice'
import { AppDispatch, RootState } from 'src/store/store'
import { addTaskThunk } from 'src/store/thunks/addTaskThunk'
import { updateTaskThunk } from 'src/store/thunks/updateTaskThunk'

const SubmitForm = memo(() => {
	const { storageType } = useStorage()
	const [validate, setValidate] = useState<string>('')
	const [valueTask, setValueTask] = useState<string>('')
	const [valueTime, setValueTime] = useState<string>('')
	const [valueCategory, setValueCategory] = useState<number | ''>('')
	const dispatch = useDispatch<AppDispatch>()
	const { taskForUpdate } = useSelector((state: RootState) => state.alltask)

	useEffect(() => {
		if (taskForUpdate) {
			setValueTask(taskForUpdate?.myTask ?? '')
			setValueTime(taskForUpdate?.dueDate ?? '')
			setValueCategory(taskForUpdate?.categoryId ?? '')
		}
	}, [taskForUpdate])

	useEffect(() => {
		console.log('storageType', storageType)
		clear()
	}, [storageType])

	const clear = useCallback(() => {
		dispatch(alltaskActions.getTaskForUpdateById(null))
		setValueCategory('')
		setValueTask('')
		setValueTime('')
	}, [])

	const submit = useCallback(
		(event: FormEvent) => {
			const target = event.target as typeof event.target & NewTaskFormT
			event.preventDefault()
			const { inputdatatime, textarea, select } = target
			if (textarea.value === '') setValidate('заповніть поле для задачі')
			else if (inputdatatime.value === '') setValidate('оберіть дату')
			else if (select.value === '') setValidate('оберіть категорію')
			else {
				dispatch(
					addTaskThunk({
						addTask: {
							task: textarea.value,
							dateTime: inputdatatime.value,
							categoryId: +select.value,
						},
					}),
				)
				clear()
			}
		},
		[dispatch, clear],
	)

	const update = useCallback(
		(event: FormEvent) => {
			const target = event.target as typeof event.target & NewTaskFormT
			event.preventDefault()
			const { inputdatatime, textarea, select } = target
			if (textarea.value === '') setValidate('заповніть поле для задачі')
			else if (inputdatatime.value === '') setValidate('оберіть дату')
			else if (select.value === '') setValidate('оберіть категорію')
			else if (taskForUpdate) {
				dispatch(
					updateTaskThunk({
						updateTask: {
							id: taskForUpdate.id,
							task: textarea.value,
							dateTime: inputdatatime.value,
							categoryId: +select.value,
						},
					}),
				)
				clear()
			}
			return
		},
		[taskForUpdate, dispatch, clear],
	)

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
						<SelectCategory
							setValidate={setValidate}
							setValueCategory={setValueCategory}
							valueCategory={valueCategory}
						/>
						{!taskForUpdate ? (
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
})

export default SubmitForm
