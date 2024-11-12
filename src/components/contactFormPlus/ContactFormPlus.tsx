'use client'

import {ChangeEvent, useEffect, useRef} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import Modal from '@/components/modal/Modal'
import {ModalHandle} from '@/components/modal/modal.types'
import Htag from "@/components/Htag/Htag";

interface IFieldConfig {
    name: string
    type: string
    placeholder: string
    required?: boolean
    validation?: object
    options?: { value: string; label: string }[] // для select
}

interface IContactFormProps {
    title?: string
    fields: IFieldConfig[]
    storageKey?: string
}

export default function ContactFormPlus({
                                            title,
                                            fields,
                                            storageKey = 'contactFormData'
                                        }: IContactFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {errors}
    } = useForm()


// Создаем начальные значения из конфигурации полей
    const defaultValues = fields.reduce(
        (acc, field) => ({
            ...acc,
            [field.name]: '',
        }),
        {}
    );

    useEffect(() => {
        const savedFormData = localStorage.getItem(storageKey);

        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);

            Object.keys(parsedData).forEach(key => {
                setValue(key, parsedData[key]);
            });
        }
    }, [setValue, storageKey]);

    const watchedFields = watch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            localStorage.setItem(storageKey, JSON.stringify(watchedFields));
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [watchedFields, storageKey]);

    const formatPhoneNumber = (value: string) => {
        if (value.length === 0) return value;

        const numberOnly = value.replace(/\D/g, '');
        const normalizedNumber = numberOnly.startsWith('8')
            ? '7' + numberOnly.slice(1)
            : numberOnly;

        return '+' + normalizedNumber.slice(0, 11);
    };

    const handlePhoneChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setValue(name, formatted);
    };

    const onSubmit: SubmitHandler<any> = async data => {
        try {
            const res = await fetch('/api/formOptions', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, title})
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();

            if (result.success) {
                showModal();
                localStorage.removeItem(storageKey);
                reset();
            } else {
                alert(result.error || 'Failed to send message.');
            }
        } catch (error) {
            console.error('Error submitting mainForm:', error);
            alert('Error sending message. Please try again.');
        }
    };

    const modalRef = useRef<ModalHandle>(null);
    const showModal = () => modalRef.current?.showModal();

    const renderField = (field: IFieldConfig) => {
        const commonProps = {
            id: field.name,
            placeholder: field.placeholder,
            className: 'input input-bordered w-full',
            ...register(field.name, {
                required: field.required,
                ...field.validation
            })
        };

        switch (field.type) {
            case 'textarea':
                return <textarea {...commonProps} className='input input-bordered w-full p-3.5 h-24' />;

            case 'select':
                return (
                    <select
                        {...commonProps}
                        className="select select-bordered w-full"
                        defaultValue='Категория' // Установите значение по умолчанию здесь
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
                );

            case 'tel':
                return (
                    <input
                        {...commonProps}
                        type="tel"
                        onChange={handlePhoneChange(field.name)}
                        className='input input-bordered w-full'
                    />
                );

            default:
                return <input {...commonProps} type={field.type} className='input input-bordered w-full' />;
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-9 p-10 bg-[#F7F8FD] rounded-3xl"
            >
                <Htag tag='h3' className='font-normal my-5 text-4xl'>Рассчитать <br/>стоимость</Htag>
                <div className="flex flex-wrap gap-9">
                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className="w-full relative"
                        >
                            {renderField(field)}
                            {errors[field.name] && (
                                <span className="absolute left-0 -bottom-7">
                {`Поле ${field.placeholder} обязательно`}
              </span>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className='btn btn-outline rounded-3xl text-[#3591D5]'
                >
                    Рассчитать
                </button>
            </form>

            <Modal ref={modalRef}
                   message='Ваше обращение отправлено! Спасибо за проявленный интерес!'
            />
        </>
    )
}