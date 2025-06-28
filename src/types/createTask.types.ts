export type AddTaskT = {
	task: string
	dateTime: string
	categoryId: number
}
export type UpdateTaskT = {
	id: number
	task: string
	dateTime: string
	categoryId: number
}

export type NewTaskFormT = {
	inputdatatime: {
		value: string
	}
	textarea: {
		value: string
	}
	select: {
		value: string
	}
}
