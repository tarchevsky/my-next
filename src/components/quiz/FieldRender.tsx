import { FieldRenderProps } from './quiz.types'
import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'

const FieldRender: FC<FieldRenderProps> = ({
	field,
	register,
	errors,
	control
}) => {
	switch (field.type) {
		case 'tel':
			return (
				<>
					<Controller
						name={field.name}
						control={control}
						rules={{
							required: field.required,
							pattern: {
								value: /^\+7\d{10}$/,
								message: 'Введите номер телефона формата +77777777777'
							}
						}}
						render={({ field: { onChange, value } }) => (
							<input
								type='tel'
								id={field.name}
								value={value || ''}
								required={field.required}
								onChange={e => {
									const formattedValue = formatPhoneNumber(e.target.value)
									onChange(formattedValue)
								}}
								{...register}
								placeholder={field.placeholder}
								className='input input-bordered w-full'
							/>
						)}
					/>
					{errors[field.name] && (
						<span className='error-message'>
							{errors[field.name]?.message ||
								field.error ||
								'Это поле обязательно'}
						</span>
					)}
				</>
			)
		case 'text':
		case 'email':
			return (
				<>
					<input
						type={field.type}
						id={field.name}
						{...register(field.name, {
							required: field.required,
							...(field.type === 'email' && {
								validate: {
									matchPattern: v =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
										'Некорректный email адрес'
								}
							})
						})}
						required={field.required}
						placeholder={field.placeholder}
						className='input input-bordered w-full'
					/>
					{errors[field.name] && (
						<span className='error-message'>
							{errors[field.name]?.message ||
								field.error ||
								'Это поле обязательно'}
						</span>
					)}
				</>
			)
		case 'radio':
			if (!field.options) {
				return null // или какой-то другой обработчик ошибки
			}
			return (
				<div className='form-control'>
					<div>{field.title}</div>
					{field.options.map(option => (
						<label key={option.value} className='label cursor-pointer'>
							<span className='label-text'>{option.label}</span>
							<input
								type='radio'
								value={option.value}
								required={field.required}
								{...register(field.name, { required: field.required })}
								className='radio'
							/>
						</label>
					))}
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</div>
			)
		case 'textarea':
			return (
				<div>
					<label key={field.value}></label>
					<textarea
						id={field.name}
						value={field.value}
						{...register(field.name, { required: field.required })}
						placeholder={field.placeholder}
						required={field.required}
						className='textarea textarea-bordered w-full'
					></textarea>
					{errors[field.name] && (
						<span className='error-message'>
							{field.error || 'Это поле обязательно'}
						</span>
					)}
				</div>
			)
		default:
			return null
	}
}

export default FieldRender
