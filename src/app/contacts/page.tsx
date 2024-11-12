import Carousel from "@/components/carousel/Carousel";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function ContactsPage() {
	return (
		<div className='cont'>
			<Carousel />
		</div>
	)
}
