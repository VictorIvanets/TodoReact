import { configureStore } from '@reduxjs/toolkit'
import alltaskSlice from 'src/store/slices/taskSlice'

export const store = configureStore({
	reducer: {
		alltask: alltaskSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
