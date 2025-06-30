import { useStorage } from 'src/context/StorageContext'
import '../submitform.sass'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store/store'
import { useEffect } from 'react'
import { getCategoryThunk } from 'src/store/thunks/getCategoryThunk'
interface SelectCategoryProps {
	setValidate: React.Dispatch<React.SetStateAction<string>>
	setValueCategory: React.Dispatch<React.SetStateAction<number | ''>>
	valueCategory: number | ''
	loadingCat?: boolean
}
const SelectCategory = ({
	setValidate,
	setValueCategory,
	valueCategory,
}: SelectCategoryProps) => {
	const { allCategory, loading, errorMessege } = useSelector(
		(state: RootState) => state.category,
	)
	const { storageType } = useStorage()

	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(getCategoryThunk())
	}, [dispatch, storageType])

	return (
		<select
			onChange={(e) => {
				setValidate('')
				setValueCategory(+e.target.value)
			}}
			name="select"
			className="submitform__select"
			id="category-select"
			value={valueCategory}
		>
			<option disabled value="">
				{loading
					? 'loading...'
					: errorMessege
					? errorMessege
					: '--select category--'}
			</option>

			{allCategory &&
				allCategory.map((i) => (
					<option key={i.id} value={i.id}>
						{i.categoryName}
					</option>
				))}
		</select>
	)
}

export default SelectCategory
