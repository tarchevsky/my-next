import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { SITE_NAME } from "@/constants/site.constants"
import { formFields } from "@/data/formFields"

// Определяем интерфейс для формы
interface FormData {
    [key: string]: string
}

// Определяем интерфейс для поля формы
interface FormField {
    step: number;
    name: string;
    type: string;
    placeholder: string;
    required?: boolean;
    error?: string;
    title?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
}


export async function POST(request: Request) {

    try {
        const formData: FormData = await request.json()

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // измените на true для порта 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                // не проверять сертификат
                rejectUnauthorized: false
            }
        })

        const emailText = (formFields as FormField[])
            .map((field: FormField) => {
                if (field.type === 'radio') {
                    const selectedOption = field.options?.find(
                        option => option.value === formData[field.name]
                    )
                    return `${field.title || field.placeholder}: ${selectedOption ? selectedOption.label : 'Не выбрано'}`
                } else {
                    return `${field.placeholder}: ${formData[field.name]}`
                }
            })
            .join('\n')


        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Квиз с сайта ${SITE_NAME}`,
            text: emailText
        })

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
    )
}