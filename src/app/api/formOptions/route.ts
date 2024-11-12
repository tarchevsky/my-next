import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface FormData {
    from: string
    to: string
    weight: number
    phone: string
    title?: string
}

export async function POST(request: Request) {
    try {
        const data: FormData = await request.json()
        const { from, to, weight, phone, title } = data

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
                <h2>Рассчитать стоимость</h2>
                <p><strong>Откуда:</strong> ${from}</p>
                <p><strong>Куда:</strong> ${to}</p>
                <p><strong>Вес:</strong> ${weight}</p>
                <p><strong>Телефон:</strong> ${phone}</p>
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