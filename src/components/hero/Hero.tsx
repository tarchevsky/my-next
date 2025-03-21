import { HeroProps } from '@/types'
import Image from 'next/image'

const Hero = ({ title, buttonText, src, alt }: HeroProps) => {
	return (
		<main className='hero md:min-h-[80vh]'>
			<div className='relative hero-content flex-col lg:flex-row'>
				<Image
					className='lg:w-1/2 h-[600px] object-cover rounded-box shadow-2xl'
					src={src}
					alt={alt || 'Картинка без описания'}
					priority
					width={600}
					height={600}
				/>
				<div className='absolute lg:relative lg:ml-[-100px] z-10'>
					<h1
						className='md:text-6xl font-bold'
						dangerouslySetInnerHTML={{
							__html: title,
						}}
					/>
					<button className='btn btn-primary btn-lg'>{buttonText}</button>
				</div>
			</div>
		</main>
	)
}

export default Hero
