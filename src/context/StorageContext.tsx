import React, { createContext, useContext, useState } from 'react'
import { StorageType } from '../types/storage.types'

const StorageContext = createContext<{
	storageType: StorageType
	setStorageType: (type: StorageType) => void
}>({ storageType: 'sql', setStorageType: () => {} })

export const useStorage = () => useContext(StorageContext)

export const StorageProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [storageType, setStorageType] = useState<StorageType>('sql')

	return (
		<StorageContext.Provider value={{ storageType, setStorageType }}>
			{children}
		</StorageContext.Provider>
	)
}
