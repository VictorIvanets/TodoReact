import { createSlice } from '@reduxjs/toolkit'
import { ToDoT } from 'src/types/todo.types'
import { getOneTaskThunk } from '../thunks/getOneTaskThunk'

export interface InitState {
	loading: boolean
	errorMessege: string | undefined
	taskForUpdate: ToDoT | null
}

const initialState: InitState = {
	errorMessege: '',
	loading: false,
	taskForUpdate: null,
}

export const alltaskSlice = createSlice({
	name: 'alltask',
	initialState,
	reducers: {
		getTaskForUpdateById: (state) => {
			state.taskForUpdate = null
		},
		setIsLoading: (state, action) => {
			state.loading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getOneTaskThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(getOneTaskThunk.fulfilled, (state, actions) => {
			state.taskForUpdate = actions.payload
			state.loading = false
		})
		builder.addCase(getOneTaskThunk.rejected, (state, action) => {
			state.errorMessege = action.payload as string
			state.loading = false
		})
	},
})

export const alltaskActions = alltaskSlice.actions
export default alltaskSlice.reducer
