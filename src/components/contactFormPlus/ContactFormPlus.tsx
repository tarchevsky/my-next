'use client'

import { ChangeEvent, useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Modal from '@/components/modal/Modal'
import { ModalHandle } from '@/components/modal/modal.types'
import Link from 'next/link'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import {
	IContactFormProps,
	IFieldConfig,
	IFormInputs
} from '@/components/quiz/quiz.types'

export default function ContactFormPlus({
	title,
	fields,
	storageKey = 'contactFormPlusData'
}: IContactFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors }
	} = useForm<IFormInputs>()

	useEffect(() => {
		const savedFormData = localStorage.getItem(storageKey)

		if (savedFormData) {
			const parsedData = JSON.parse(savedFormData)

			Object.keys(parsedData).forEach(key => {
				setValue(key, parsedData[key])
			})
		}
	}, [setValue, storageKey])

	const watchedFields = watch()

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			localStorage.setItem(storageKey, JSON.stringify(watchedFields))
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [watchedFields, storageKey])

	const handlePhoneChange =
		(name: string) => (e: ChangeEvent<HTMLInputElement>) => {
			const formatted = formatPhoneNumber(e.target.value)
			setValue(name, formatted, {
				shouldValidate: true // Добавляем валидацию при изменении
			})
		}

	const submitForm = async (data: any) => {
		try {
			const res = await fetch('/api/formOptions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, title })
			})

			if (!res.ok) throw new Error('Network response was not ok')

			const result = await res.json()
			if (result.success) {
				showModal()
				localStorage.removeItem(storageKey)
				reset()
			} else {
				alert(result.error || 'Failed to send message.')
			}
		} catch (error) {
			console.error('Error submitting mainForm:', error)
			alert('Error sending message. Please try again.')
		}
	}

	const onSubmit: SubmitHandler<IFormInputs> = submitForm

	const modalRef = useRef<ModalHandle>(null)
	const showModal = () => modalRef.current?.showModal()

	const renderField = (field: IFieldConfig) => {
		const commonProps = {
			id: field.name,
			placeholder: field.placeholder,
			...register(field.name, {
				required: field.required,
				pattern: field.pattern
			})
		}

		switch (field.type) {
			case 'textarea':
				return (
					<textarea
						{...commonProps}
						className='input input-bordered w-full p-3.5 h-24'
					/>
				)

			case 'select':
				return (
					<select
						{...commonProps}
						className='select select-bordered w-full'
						defaultValue='Категория'
					>
						{field.options?.map((option, index) => (
							<option
								key={option.value}
								value={option.value}
								disabled={index === 0}
							>
								{option.label}
							</option>
						))}
					</select>
				)

			case 'tel':
				return (
					<input
						{...commonProps}
						{...register(field.name, {
							validate: {
								length: value => {
									const digitsOnly = value.replace(/\D/g, '')
									return (
										digitsOnly.length === 11 ||
										'Номер телефона должен содержать 11 цифр'
									)
								}
							}
						})}
						type='tel'
						onChange={handlePhoneChange(field.name)}
						className='input input-bordered w-full'
					/>
				)

			default:
				return (
					<input
						{...commonProps}
						type={field.type}
						className='input input-bordered w-full'
					/>
				)
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-9 mb-8'
			>
				<div className='flex flex-wrap gap-9'>
					{fields.map(field => (
						<div key={field.name} className='w-full relative'>
							{renderField(field)}
							{errors[field.name] && (
								<span className='absolute left-0 -bottom-7'>
									{errors[field.name]?.message}
								</span>
							)}
						</div>
					))}
				</div>

				<div>
					<div className='form-control'>
						<label className='label justify-start gap-6 cursor-pointer'>
							<span className='label-text'>
								Я оставляю свои данные и согласен с{' '}
								<Link
									href='/policy'
									aria-label='Ссылка на политику конфиденциальности'
									className='link'
									target='_blank'
									rel='noopener noreferrer'
								>
									политикой конфиденциальности
								</Link>
							</span>
							<input type='checkbox' defaultChecked className='checkbox' />
						</label>
					</div>
					<button type='submit' className='btn btn-wide'>
						Отправить
					</button>
				</div>
			</form>

			<Modal
				ref={modalRef}
				message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
			/>
		</>
	)
}
