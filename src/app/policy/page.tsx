import type { Metadata } from 'next'
import Htag from '@/components/Htag/Htag'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности'
}

export default function PolicyPage() {
	return (
		<div className='cont'>
			<Htag tag='h1'>Политика конфиденциальности</Htag>
		</div>
	)
}
