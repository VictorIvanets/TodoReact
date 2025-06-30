import { createAsyncThunk } from '@reduxjs/toolkit'
import { deleteTask } from 'src/api/deleteTask/deleteTask'

export const deleteTaskThunk = createAsyncThunk<number, { id: number }>(
	'alltask/deleteTask',
	async (input, { rejectWithValue }) => {
		try {
			return await deleteTask(input.id)
		} catch (err: any) {
			return rejectWithValue(err.message || 'Failed to delete task')
		}
	},
)
