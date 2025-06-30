import { createAsyncThunk } from '@reduxjs/toolkit'
import { addTask } from 'src/api/addTask/addTask'
import { AddTaskT } from 'src/types/createTask.types'
import { ToDoT } from 'src/types/todo.types'

export const addTaskThunk = createAsyncThunk<ToDoT, { addTask: AddTaskT }>(
	'alltask/add',
	async (input, { rejectWithValue }) => {
		try {
			return await addTask(input.addTask)
		} catch (err: any) {
			return rejectWithValue(err.message || 'Failed to add task')
		}
	},
)
