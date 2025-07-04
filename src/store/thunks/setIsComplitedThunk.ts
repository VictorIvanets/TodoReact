import { createAsyncThunk } from '@reduxjs/toolkit'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './mutation.graphql'
import parsErrorGQL from 'src/helpers/errorGQL'

export const setIsComplitedThunk = createAsyncThunk<number, { id: number }>(
	'alltask/setIsComplited',
	async (input, { rejectWithValue }) => {
		try {
			const data = await gqlClientWithStorage().request<
				Record<'setIsCompleted', number>
			>(_queries.SetIsComplited, {
				id: input.id,
			})
			return data.setIsCompleted
		} catch (err: any) {
			return rejectWithValue(parsErrorGQL(err))
		}
	},
)
