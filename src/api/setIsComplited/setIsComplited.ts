import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './mutation.graphql'

export const setIsComplited = async (id: number) => {
	type setIsComplitedResponse = {
		setIsCompleted: number
	}

	const observable$ = from(
		gqlClientWithStorage().request<setIsComplitedResponse>(
			_queries.SetIsComplited,
			{
				id,
			},
		),
	).pipe(
		map((res) => res.setIsCompleted),
		catchError((err) => throwError(() => new Error(err.message))),
	)

	return await firstValueFrom(observable$)
}
