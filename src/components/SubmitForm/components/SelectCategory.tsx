import { useStorage } from 'src/context/StorageContext'
import '../submitform.sass'
import { useEffect } from 'react'
import { useGetCategory } from 'src/api/hooks/useGetCategory'
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
	const { category, categoryError, categoryLoading, refetch } = useGetCategory()
	const { storageType } = useStorage()
	useEffect(() => {
		refetch()
	}, [storageType])

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
				{categoryLoading
					? 'loading...'
					: categoryError
					? categoryError.message
					: '--select category--'}
			</option>

			{category &&
				category.map((i) => (
					<option key={i.id} value={i.id}>
						{i.categoryName}
					</option>
				))}
		</select>
	)
}

export default SelectCategory
