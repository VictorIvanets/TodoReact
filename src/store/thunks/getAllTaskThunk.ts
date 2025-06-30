import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAllTasks } from 'src/api/getAllTask/getAllTasks'

export const getAllTask = createAsyncThunk(
	'alltask/get',
	async (_, { rejectWithValue }) => {
		try {
			const result = await getAllTasks()
			return result
		} catch (error: any) {
			return rejectWithValue(error.message || 'Unknown error')
		}
	},
)
