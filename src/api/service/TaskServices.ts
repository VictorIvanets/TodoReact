import { gqlClientWithStorage as _client } from 'src/api/client/gqlClient'
import { ToDoT } from 'src/types/todo.types'
import parsErrorGQL from 'src/helpers/errorGQL'
import { _queries as _getalltasks } from 'src/api/graphql/getAllTasks.graphql'
import { _queries as _setiscomplited } from 'src/api/graphql/setIsComplited.graphql'
import { _queries as _addtask } from 'src/api/graphql/addTask.graphql'
import { _queries as _deletetask } from 'src/api/graphql/deleteTask.graphql'
import { _queries as _getone } from 'src/api/graphql/getOneTask.graphql'
import { _queries as _updateTask } from 'src/api/graphql/updateTask.graphql'
import { _queries as _category } from 'src/api/graphql/getCategory.graphql'

import { AddTaskT, UpdateTaskT } from 'src/types/createTask.types'
import { CategoryT } from 'src/types/category.types'

class TaskServices {
	// _client = gqlClientWithStorage()

	getAllTast = async (): Promise<ToDoT[]> => {
		try {
			const { allTask } = await _client().request<Record<'allTask', ToDoT[]>>(
				_getalltasks.getAllTasks,
			)
			return allTask
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}

	getCategory = async (): Promise<CategoryT[]> => {
		try {
			const { allCategory } = await _client().request<
				Record<'allCategory', CategoryT[]>
			>(_category.GetAllCategory)
			return allCategory
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}

	setIsComplited = async (id: number) => {
		try {
			const data = await _client().request<Record<'setIsCompleted', number>>(
				_setiscomplited.SetIsComplited,
				{
					id,
				},
			)
			return data.setIsCompleted
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}
	deleteTask = async (id: number) => {
		try {
			const data = await _client().request<Record<'deleteTask', number>>(
				_deletetask.DeleteTask,
				{
					id,
				},
			)
			console.log(data.deleteTask)
			console.log(typeof data.deleteTask)
			return data.deleteTask
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}
	getOneTask = async (id: number) => {
		try {
			const data = await _client().request<Record<'oneTask', ToDoT>>(
				_getone.GetOneTask,
				{
					id,
				},
			)
			return data.oneTask
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}

	addTask = async (addTask: AddTaskT) => {
		try {
			const data = await _client().request<Record<'addTask', ToDoT>>(
				_addtask.AddTask,
				{
					AddTask: addTask,
				},
			)
			return data.addTask
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}
	updateTask = async (updateTask: UpdateTaskT) => {
		try {
			const data = await _client().request<Record<'updateTask', ToDoT>>(
				_updateTask.UpDate,
				{
					UpdateTask: updateTask,
				},
			)
			return data.updateTask
		} catch (err: any) {
			throw new Error(parsErrorGQL(err))
		}
	}
}

export const taskServices = new TaskServices()
