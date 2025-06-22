export type EventSelectStorage = React.ChangeEvent<HTMLSelectElement> & {
	target: Record<'value', StorageType>
}

export type StorageType = 'xml' | 'sql'
