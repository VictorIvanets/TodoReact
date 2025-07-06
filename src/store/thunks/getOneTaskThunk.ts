import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskServices } from 'src/api/service/TaskServices'
import { ToDoT } from 'src/types/todo.types'

export const getOneTaskThunk = createAsyncThunk<ToDoT, { id: number }>(
	'alltask/getOneTask',
	async (input, { rejectWithValue }) => {
		try {
			return await taskServices.getOneTask(input.id)
		} catch (err: any) {
			return rejectWithValue(err.message || 'get one task error')
		}
	},
)
