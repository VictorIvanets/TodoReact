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
			return throwError(() => new Error(err.message))
		}),
	)
	return await firstValueFrom(observable$)
}
