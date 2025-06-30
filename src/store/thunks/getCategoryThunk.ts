import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCategory } from 'src/api/getCategory/getCategory'

export const getCategoryThunk = createAsyncThunk(
	'category/get',
	async (_, { rejectWithValue }) => {
		try {
			const result = await getCategory()
			return result
		} catch (error: any) {
			return rejectWithValue(error.message || 'Unknown error')
		}
	},
)
