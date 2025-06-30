import { createAsyncThunk } from '@reduxjs/toolkit'
import { getOneTask } from 'src/api/getOneTask/getOneTask'
import { ToDoT } from 'src/types/todo.types'

export const getOneTaskThunk = createAsyncThunk<ToDoT, { id: number }>(
	'alltask/getOneTask',
	async (input, { rejectWithValue }) => {
		try {
			return await getOneTask(input.id)
		} catch (err: any) {
			return rejectWithValue(err.message || 'get one task error')
		}
	},
)
