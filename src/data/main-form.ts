export const mainForm = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Имя',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Почта',
        required: true,
        validation: {
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат email"
            }
        }
    },
    {
        name: 'phone',
        type: 'tel',
        placeholder: 'Телефон',
        required: true
    },
    {
        name: 'message',
        type: 'textarea',
        placeholder: 'Сообщение',
        required: false
    },
    {
        name: 'category',
        type: 'select',
        placeholder: 'Категория',
        options: [
            { value: 'Не выбрано', label: 'Выберите категорию услуги' }, // Первый пункт использовать как название группы select
            { value: 'Поддержка поддержка', label: 'Поддержка' }, // Первый пункт использовать как название группы select
            { value: 'Продажи прожади', label: 'Продажи' }
        ]
    }
]