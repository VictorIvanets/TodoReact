import { useStorage } from '../../context/StorageContext'
import { EventSelectStorage } from '../../types/storage.types'
import './selectstorage.sass'

const SelectStorage = () => {
	const { storageType, setStorageType } = useStorage()

	return (
		<select
			className="selectstorage"
			value={storageType}
			onChange={(e: EventSelectStorage) => {
				setStorageType(e.target.value)
			}}
		>
			<option value="sql">SQL</option>
			<option value="xml">XML</option>
		</select>
	)
}

export default SelectStorage
