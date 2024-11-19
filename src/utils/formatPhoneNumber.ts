export const formatPhoneNumber = (value: string) => {
	// Удаляем все нецифровые символы
	const number = value.replace(/\D/g, '');

	// Если номер пустой, возвращаем пустую строку
	if (!number) return '';

	// Берем только первые 11 цифр
	const digits = number.slice(0, 11);

	// Нормализуем номер (заменяем 8 на 7 в начале)
	const normalizedNumber = digits.startsWith('8')
		? '7' + digits.slice(1)
		: digits;

	// Если есть цифры, добавляем +7
	if (normalizedNumber.length > 0) {
		return '+' + normalizedNumber.slice(0, 11) // Ограничиваем длину 11 цифрами
	}

	return value;
}