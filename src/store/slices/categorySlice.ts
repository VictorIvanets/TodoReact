import { createSlice } from '@reduxjs/toolkit'
import { CategoryT } from 'src/types/category.types'
import { getCategoryThunk } from '../thunks/getCategoryThunk'

export interface InitState {
	allCategory: CategoryT[]
	loading: boolean
	errorMessege: string | undefined
}

const initialState: InitState = {
	allCategory: [],
	errorMessege: '',
	loading: false,
}

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCategoryThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(getCategoryThunk.fulfilled, (state, actions) => {
			state.allCategory = actions.payload
			state.loading = false
		})
		builder.addCase(getCategoryThunk.rejected, (state, action) => {
			state.errorMessege = action.payload as string
			state.loading = false
		})
	},
})

export const alltaskActions = categorySlice.actions
export default categorySlice.reducer
