
import type {Metadata} from "next";
import OrientationCheck from "@/components/orientationCheck/OrientationCheck";

export const metadata: Metadata = {
	title: 'Главная',
}

export default function Home() {
	return (
		<OrientationCheck/>
	)
}
