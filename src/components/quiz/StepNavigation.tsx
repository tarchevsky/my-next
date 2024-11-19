import { StepNavigationProps } from '@/components/quiz/quiz.types'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { FC } from 'react'

const StepNavigation: FC<StepNavigationProps> = ({
	currentStep,
	totalSteps,
	prevStep,
	nextStep,
	onSubmit
}) => (
	<>
		{currentStep === totalSteps ? (
			<button type='submit' onClick={onSubmit} className='btn btn-primary'>
				Отправить
			</button>
		) : (
			''
		)}
		<div className='flex justify-end'>
			<button
				type='button'
				onClick={prevStep}
				className={`btn ${
					currentStep === 1 ? 'btn-disabled' : 'btn-secondary'
				}`}
				disabled={currentStep === 1}
			>
				<IoIosArrowBack />
			</button>
			{currentStep === totalSteps ? (
				<>
					<button
						type='button'
						onClick={nextStep}
						className='btn btn-primary btn-disabled'
						aria-disabled='true'
					>
						<IoIosArrowForward />
					</button>
				</>
			) : (
				<button type='button' onClick={nextStep} className='btn btn-primary'>
					<IoIosArrowForward />
				</button>
			)}
		</div>
	</>
)

export default StepNavigation
