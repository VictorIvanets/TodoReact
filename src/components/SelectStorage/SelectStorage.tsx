import { useEffect } from 'react'
import { useStorage } from '../../context/StorageContext'
import { EventSelectStorage, StorageType } from '../../types/storage.types'
import './selectstorage.sass'

const SelectStorage = () => {
	const { storageType, setStorageType } = useStorage()

	useEffect(() => {
		const savedStorageType = localStorage.getItem('storageTodo') || 'sql'
		setStorageType(savedStorageType as StorageType)
	}, [])

	return (
		<select
			className="selectstorage"
			value={storageType}
			onChange={(e: EventSelectStorage) => {
				setStorageType(e.target.value)
				localStorage.setItem('storageTodo', e.target.value)
			}}
		>
			<option value="sql">SQL</option>
			<option value="xml">XML</option>
		</select>
	)
}

export default SelectStorage
