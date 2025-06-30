import { createAsyncThunk } from '@reduxjs/toolkit'
import { setIsComplited } from 'src/api/setIsComplited/setIsComplited'

export const setIsComplitedThunk = createAsyncThunk<number, { id: number }>(
	'alltask/setIsComplited',
	async (input, { rejectWithValue }) => {
		try {
			return await setIsComplited(input.id)
		} catch (err: any) {
			return rejectWithValue(err.message || 'Failed set is complited')
		}
	},
)
