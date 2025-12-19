"use client";

import CardWrapper from '@/components/auth/card-wrapper'

import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorPage = () => {
	return (
		<CardWrapper headerLabel='Oops Something Went Wrong' backButtonHref='/auth/login' backButtonLabel='Back To Log In'>
			<div className="flex items-center justify-center">
				<FaExclamationTriangle className='size-5 text-destructive' />
			</div>

		</CardWrapper>
	)
}

export default ErrorPage
