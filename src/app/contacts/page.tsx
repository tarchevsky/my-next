import Carousel from "@/components/carousel/Carousel";
import type {Metadata} from "next";
import ContactFormPlus from "@/components/contactFormPlus/ContactFormPlus";
import {deliveryForm} from "@/data/delivery-form";

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function ContactsPage() {
	const serializedFields = JSON.parse(JSON.stringify(deliveryForm))
	return (
		<div className='cont'>
			<Carousel />
			<ContactFormPlus
				title="Контактная форма"
				fields={serializedFields}
				storageKey="myCustomFormData"
			/>
		</div>
	)
}
