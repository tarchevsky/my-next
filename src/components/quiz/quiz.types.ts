import { FieldErrors, UseFormRegister } from 'react-hook-form'

export type OptionType = {
	label?: string
	value: string
}

export interface FormField {
	step: number
	name: string
	type: 'text' | 'email' | 'tel' | 'radio' | 'textarea'
	label?: string
	placeholder?: string
	required?: boolean
	value: string
	title?: string
	error?: string
	options?: OptionType[]
}

export type FormFieldName = FormField['name']

export interface IQuizInput {
	[key: FormFieldName]: string
}

export interface FieldRenderProps {
	field: FormField
	register: UseFormRegister<IQuizInput>
	errors: FieldErrors<IQuizInput>
	control: any
}

export interface StepNavigationProps {
	currentStep: number
	totalSteps: number
	prevStep: () => void
	nextStep: () => void
	onSubmit: () => void
}

export interface IFormInputs {
	[key: string]: string
}

export interface IFieldConfig {
	name: string
	type: string
	placeholder: string
	required?: string
	pattern?: {
		value: RegExp
		message: string
	}
	options?: { value: string; label: string }[] // для select
}

export interface IContactFormProps {
	title?: string
	fields: IFieldConfig[]
	storageKey?: string
}