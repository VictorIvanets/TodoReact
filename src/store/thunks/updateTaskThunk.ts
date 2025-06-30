import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateTask } from 'src/api/updateTask/updateTask'
import { UpdateTaskT } from 'src/types/createTask.types'
import { ToDoT } from 'src/types/todo.types'

export const updateTaskThunk = createAsyncThunk<
	ToDoT,
	{ updateTask: UpdateTaskT }
>('alltask/update', async (input, { rejectWithValue }) => {
	try {
		return await updateTask(input.updateTask)
	} catch (err: any) {
		return rejectWithValue(err.message || 'Failed to update task')
	}
})
