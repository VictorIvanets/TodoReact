import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ToDoT } from 'src/types/todo.types'
import { allTaskMock } from './taskMock'
import { getAllTasks } from 'src/_api.apollo/getAllTasks/useGetAllTask.hook'

export interface InitState {
	alltask: ToDoT[]
	loading: boolean
	errorMassege: string | undefined
	taskForUpdate: ToDoT | null
}

const initialState: InitState = {
	alltask: allTaskMock,
	errorMassege: '',
	loading: false,
	taskForUpdate: null,
}

export const getAllTask = createAsyncThunk('alltask', async () => {
	const { loading, error, allTask, refetch } = getAllTasks() ///// ????????????
	return allTask
})

export const alltaskSlice = createSlice({
	name: 'alltask',
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.alltask.push(action.payload)
		},
		setIsComplById: (state, action) => {
			state.alltask.forEach((i) => {
				if (i.id === action.payload) {
					i.isCompleted = !i.isCompleted
				}
			})
		},
		deleteTaskById: (state, action) => {
			state.alltask = state.alltask.filter((i) => i.id !== action.payload)
		},
		getTaskForUpdateById: (state, action) => {
			state.taskForUpdate = state.alltask.filter(
				(i) => i.id === action.payload,
			)[0]
		},
		updateTaskById: (state, action) => {
			const index = state.alltask.findIndex((i) => i.id === action.payload.id)
			if (index !== -1) {
				state.alltask[index] = action.payload
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getAllTask.pending, (state) => {
			state.errorMassege = undefined
			state.loading = true
		})
		builder.addCase(getAllTask.fulfilled, (state, actions) => {
			state.alltask = actions.payload
			state.loading = false
		})
		builder.addCase(getAllTask.rejected, (state, action) => {
			state.errorMassege = action.error.message
			state.loading = false
		})
	},
})

export const alltaskActions = alltaskSlice.actions
export default alltaskSlice.reducer
