import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import {SITE_NAME} from "@/constants/site.constants";

interface FormData {
    name: string
    email: string
    phone: string
    message: string
    title?: string
}

export async function POST(request: Request) {
    try {
        const data: FormData = await request.json()
        const { name, email, phone, message, title } = data

        // Настройка транспорта nodemailer
        const transporter = nodemailer.createTransport({
            // ваши настройки SMTP
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })

        // Настройка письма
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Новая заявка${title ? ` - ${title}` : ''}`,
            html: `
                <h2>Новая заявка с сайта ${SITE_NAME}</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Телефон:</strong> ${phone}</p>
                <p><strong>Сообщение:</strong> ${message}</p>
            `
        }

        // Отправка письма
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        )
    }
}