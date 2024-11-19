export const formFields = [
	{
		step: 1,
		name: 'name',
		type: 'text',
		placeholder: 'Имя',
		required: true,
		error: 'Пожалуйста, введите имя'
	},
	{
		step: 1,
		name: 'email',
		type: 'email',
		placeholder: 'Почта',
		required: true,
		error: 'Пожалуйста, введите почту'
	},
	{
		step: 2,
		name: 'phone',
		type: 'tel',
		placeholder: 'Телефон',
		required: true,
		error: 'Пожалуйста, введите телефон'
	},
	{
		step: 2,
		name: 'message',
		type: 'textarea',
		placeholder: 'Сообщение'
	},
	{
		step: 3,
		name: 'pizzaOpinion',
		type: 'radio',
		title: 'Пицца это полезно или нет?',
		options: [
			{ label: 'Полезно', value: 'полезно' },
			{ label: 'Не полезно', value: 'не полезно' },
			{ label: 'Зависит от ингредиентов', value: 'зависит от ингридиентов' }
		]
	},
	{
		step: 4,
		name: 'backendRequired',
		type: 'radio',
		title: 'Нужно ли учить бэкенд?',
		options: [
			{ label: 'Да', value: 'Да' },
			{ label: 'Нет', value: 'Нет' },
			{ label: 'Не знаю', value: 'Не знаю' }
		]
	},
	{
		step: 4,
		name: 'backendRequiredOther',
		type: 'text',
		placeholder: 'Другое'
	}
]
