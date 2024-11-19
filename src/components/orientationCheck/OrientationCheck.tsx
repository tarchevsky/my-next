'use client';
import {useState, useEffect} from 'react';

export default function OrientationCheck() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isPortrait, setIsPortrait] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<string | null>(null);

    useEffect(() => {
        // Проверка, является ли устройство мобильным
        const checkIfMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

            // Исключаем планшеты
            const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) && !isTablet;
            setIsMobile(isMobileDevice);
        };

        checkIfMobile();
    }, []);

    useEffect(() => {
        if (!isMobile) return; // Если не мобильное устройство, прекращаем выполнение

        // Функция для проверки ориентации
        const checkOrientation = (): void => {
            if (window.screen && window.screen.orientation) {
                setIsPortrait(window.screen.orientation.type.includes('portrait'));
                setOrientation(window.screen.orientation.type);
            }
        };

        // Первоначальная проверка
        checkOrientation();

        // Добавляем слушатель событий изменения ориентации
        if (window.screen && window.screen.orientation) {
            window.screen.orientation.addEventListener('change', checkOrientation);
        }

        // Очистка слушателей при размонтировании компонента
        return () => {
            if (window.screen && window.screen.orientation) {
                window.screen.orientation.removeEventListener('change', checkOrientation);
            }
        };
    }, [isMobile]);

    // Если не мобильное устройство, не рендерим компонент
    if (!isMobile) {
        return null;
    }

    return (
        <div className='cont text-center'>
            {isPortrait ? (
                <p>
                    Пожалуйста, переверните устройство горизонтально!
                </p>
            ) : (
                <p>
                    Отлично! Устройство в горизонтальном положении
                </p>
            )}
        </div>
    );
}