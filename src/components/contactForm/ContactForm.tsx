'use client'

import { ChangeEvent, useEffect, useRef } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Modal from '@/components/modal/Modal'
import { ModalHandle } from '@/components/modal/modal.types'
import Link from 'next/link'
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";

interface IContactFormProps {
	title?: string
}

interface IFormInput {
	name: string
	email: string
	phone: string
	message: string
}

export default function ContactForm({ title }: IContactFormProps) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors }
	} = useForm<IFormInput>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			message: ''
		}
	})

	// Функция для форматирования телефона


	// Обработчик изменения поля телефона
	const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
		const formatted = formatPhoneNumber(e.target.value)
		setValue('phone', formatted)
	}

	useEffect(() => {
		const savedFormData = localStorage.getItem('contactFormData')
		if (savedFormData) {
			const parsedData = JSON.parse(savedFormData)
			setValue('name', parsedData.name)
			setValue('email', parsedData.email)
			setValue('phone', parsedData.phone)
			setValue('message', parsedData.message)
		}
	}, [setValue])

	const watchedFields = watch()
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			localStorage.setItem('contactFormData', JSON.stringify(watchedFields))
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [watchedFields])

	const onSubmit: SubmitHandler<IFormInput> = async data => {
		try {
			const res = await fetch('/api/mainForm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...data, title })
			})

			if (!res.ok) {
				throw new Error('Network response was not ok')
			}

			const result = await res.json()
			if (result.success) {
				showModal()
				localStorage.removeItem('contactFormData')
				reset()
			} else {
				alert(result.error || 'Failed to send message.')
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			alert('Error sending message. Please try again.')
		}
	}

	const modalRef = useRef<ModalHandle>(null)

	const showModal = () => {
		if (modalRef.current) {
			modalRef.current.showModal()
		}
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-9 mb-8'
			>
				<div className='flex flex-col sm:flex-row gap-9'>
					<div className='w-full relative'>
						<input
							type='text'
							id='name'
							{...register('name', { required: true })}
							placeholder='Имя'
							className='input input-bordered w-full'
						/>
						{errors.name && (
							<span className='absolute left-0 -bottom-7'>
								Введите своё имя
							</span>
						)}
					</div>

					<div className='w-full relative'>
						<input
							type='email'
							id='email'
							{...register('email', { required: true })}
							placeholder='Почта'
							className='input input-bordered w-full'
						/>
						{errors.email && (
							<span className='absolute left-0 -bottom-7'>
								Упс, вы забыли ввести почту
							</span>
						)}
					</div>
				</div>

				<div className='w-full relative'>
					<input
						type='tel'
						id='phone'
						{...register('phone', {
							required: true,
							pattern: {
								value: /^\+7\d{10}$/,
								message:
									'Введите корректный номер телефона в формате +7XXXXXXXXXX'
							}
						})}
						placeholder='Телефон'
						className='input input-bordered w-full'
						onChange={e => handlePhoneChange(e)}
					/>
					{errors.phone && (
						<span className='absolute left-0 -bottom-7'>
							{errors.phone.message || 'Введите номер телефона'}
						</span>
					)}
				</div>
				<textarea
					id='message'
					{...register('message')}
					placeholder='Сообщение'
					className='input input-bordered w-full p-3.5 h-24'
				></textarea>
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
