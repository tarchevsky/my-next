import Carousel from "@/components/carousel/Carousel";
import type {Metadata} from "next";
import ContactFormPlus from "@/components/contactFormPlus/ContactFormPlus";
import {deliveryForm} from "@/data/delivery-form";
import Htag from '@/components/Htag/Htag'
import ContactForm from "@/components/contactForm/ContactForm";
import Quiz from "@/components/quiz/Quiz";

export const metadata: Metadata = {
    title: 'Шоурум',
}

export default function ShowroomPage() {
    const serializedFields = JSON.parse(JSON.stringify(deliveryForm))
    return (
        <div className='cont'>
            <Htag tag='h1'>Шоурум компонентов</Htag>
            <Carousel />
            <ContactForm />
            <ContactFormPlus
                title="Контактная форма"
                fields={serializedFields}
                storageKey="myCustomFormData"
            />
            <Quiz />
        </div>
    )
}
