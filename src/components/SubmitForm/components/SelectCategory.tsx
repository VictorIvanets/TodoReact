import '../submitform.sass'
import { categoryMock } from './allcategoryMock'
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
	loadingCat = false,
}: SelectCategoryProps) => {
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
				{loadingCat ? 'loading...' : '--select category--'}
			</option>

			{categoryMock &&
				categoryMock.map((i) => (
					<option key={i.id} value={i.id}>
						{i.categoryName}
					</option>
				))}
		</select>
	)
}

export default SelectCategory
