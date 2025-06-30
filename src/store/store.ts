import { configureStore } from '@reduxjs/toolkit'
import categorySlice from 'src/store/slices/categorySlice'
import alltaskSlice from 'src/store/slices/taskSlice'

export const store = configureStore({
	reducer: {
		alltask: alltaskSlice,
		category: categorySlice,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
