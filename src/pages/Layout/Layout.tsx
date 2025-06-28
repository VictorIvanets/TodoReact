import './layout.sass'
import { memo, useState } from 'react'
import { useStorage } from '../../client/StorageContext'
import Flex from '../../components/Flex/Flex'
import Header from '../../components/Header/Header'
import SubmitForm from '../../components/SubmitForm/SubmitForm'
import { Preloader } from '../../components/preloaders/PreloaderBall'
import { useToDoApp } from './useToDoApp'
import AllTasks from 'src/components/AllTasks/AllTasks'

const Layout = memo(() => {
	const { storageType } = useStorage()
	const [idUpdate, setIdUpdate] = useState<number>()
	const {
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
	} = useToDoApp()

	return (
		<Flex className="layout" column>
			{errorLayout && (
				<Flex center className="layout__error">
					<h2>{errorLayout}</h2>
				</Flex>
			)}
			{(loadingAdd || loadingSet || loadingDel || loadingOne || loadingUp) && (
				<Flex center className="layout__loader">
					<Preloader />
				</Flex>
			)}
			<Flex className="layout__head" gap={20}>
				<SubmitForm
					loadingCat={loadingCat}
					allCategory={allCategory || []}
					addNewTask={addNewTask}
					errorAdd={errorAdd}
					errorUp={errorUp}
					taskForUpdate={oneTask}
					updateTaskById={updateTaskById}
					setIdUpdate={setIdUpdate}
					idUpdate={idUpdate}
				/>
				<Header />
			</Flex>
			<Flex className="layout__taskwrapper">
				{idUpdate && <Flex className="layout__taskwrapper__blur"></Flex>}
				<AllTasks
					errorLayout={errorLayout}
					storageType={storageType}
					loading={loading}
					allTask={allTask || []}
					refetch={refetch}
					setIsComplById={setIsComplById}
					setIsCompleted={setIsCompleted}
					deleteTaskById={deleteTaskById}
					deleteTask={deleteTask}
					addTask={addTask}
					updateTask={updateTask}
					setIdUpdate={setIdUpdate}
					fetchOneTask={fetchOneTask}
				/>
			</Flex>
		</Flex>
	)
})

export default Layout
