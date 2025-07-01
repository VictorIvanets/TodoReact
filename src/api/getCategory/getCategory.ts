import { from, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { firstValueFrom } from 'rxjs'
import { gqlClientWithStorage } from 'src/client/gqlClient'
import { _queries } from './query.graphql'
import { CategoryT } from 'src/types/category.types'

export const getCategory = async () => {
	type CategoryResponse = {
		allCategory: CategoryT[]
	}
	const observable$ = from(
		gqlClientWithStorage().request<CategoryResponse>(_queries.GetAllCategory),
	).pipe(
		map((res) => res.allCategory),
		catchError((err) => {
			let message = 'Unknown error'

			if (err?.response?.errors?.[0]?.message) {
				message = err.response.errors[0].message
			} else if (err?.message) {
				message = err.message
			}

			return throwError(() => new Error(message))
		}),
	)
	return await firstValueFrom(observable$)
}
