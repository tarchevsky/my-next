'use client';
import {useState, useEffect, CSSProperties} from 'react';

interface Styles {
    container: CSSProperties;
    warning: CSSProperties;
    success: CSSProperties;
}

export default function OrientationCheck() {
    const [isLandscape, setIsLandscape] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<string | null>(null);

    useEffect(() => {
        // Функция для проверки ориентации
        const checkOrientation = (): void => {
            if (window.screen && window.screen.orientation) {
                setIsLandscape(window.screen.orientation.type.includes('landscape'));
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
    }, []);

    return (
        <div style={styles.container}>
            <h1>Проверка ориентации устройства</h1>
            {isLandscape ? (
                <p style={styles.warning}>
                    Пожалуйста, переверните устройство вертикально!
                </p>
            ) : (
                <p style={styles.success}>
                    Отлично! Устройство в вертикальном положении
                </p>
            )}
            <p>Текущая ориентация: {orientation}</p>
        </div>
    );
}

const styles: Styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    warning: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '18px',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: '18px',
    }
};