import { createSlice } from '@reduxjs/toolkit'
import { ToDoT } from 'src/types/todo.types'
import { getAllTask } from '../thunks/getAllTaskThunk'
import { addTaskThunk } from '../thunks/addTaskThunk'
import { setIsComplitedThunk } from '../thunks/setIsComplitedThunk'
import { deleteTaskThunk } from '../thunks/deleteTaskThunk'
import { getOneTaskThunk } from '../thunks/getOneTaskThunk'
import { updateTaskThunk } from '../thunks/updateTaskThunk'

export interface InitState {
	alltask: ToDoT[]
	loading: boolean
	errorMessege: string | undefined
	taskForUpdate: ToDoT | null
}

const initialState: InitState = {
	alltask: [],
	errorMessege: '',
	loading: false,
	taskForUpdate: null,
}

export const alltaskSlice = createSlice({
	name: 'alltask',
	initialState,
	reducers: {
		getTaskForUpdateById: (state, action) => {
			state.taskForUpdate = state.alltask.filter(
				(i) => i.id === action.payload,
			)[0]
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllTask.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(getAllTask.fulfilled, (state, actions) => {
			state.alltask = actions.payload
			state.loading = false
		})
		builder.addCase(getAllTask.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
		builder.addCase(addTaskThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(addTaskThunk.fulfilled, (state, actions) => {
			state.alltask.push(actions.payload)
			state.loading = false
		})
		builder.addCase(addTaskThunk.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
		builder.addCase(setIsComplitedThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(setIsComplitedThunk.fulfilled, (state, actions) => {
			state.alltask.forEach((i) => {
				if (i.id === actions.payload) {
					i.isCompleted = !i.isCompleted
				}
			})
			state.loading = false
		})
		builder.addCase(setIsComplitedThunk.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
		builder.addCase(deleteTaskThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(deleteTaskThunk.fulfilled, (state, actions) => {
			state.alltask = state.alltask.filter((i) => +i.id !== +actions.payload)
			state.loading = false
		})
		builder.addCase(deleteTaskThunk.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
		builder.addCase(getOneTaskThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(getOneTaskThunk.fulfilled, (state, actions) => {
			state.taskForUpdate = actions.payload
			state.loading = false
		})
		builder.addCase(getOneTaskThunk.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
		builder.addCase(updateTaskThunk.pending, (state) => {
			state.errorMessege = undefined
			state.loading = true
		})
		builder.addCase(updateTaskThunk.fulfilled, (state, actions) => {
			const index = state.alltask.findIndex((i) => i.id === actions.payload.id)
			if (index !== -1) {
				state.alltask[index] = actions.payload
			}
			state.loading = false
		})
		builder.addCase(updateTaskThunk.rejected, (state, action) => {
			state.errorMessege = action.error.message
			state.loading = false
		})
	},
})

export const alltaskActions = alltaskSlice.actions
export default alltaskSlice.reducer
