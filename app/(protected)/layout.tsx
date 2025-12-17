import { ReactNode } from 'react';
const ProtectedLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='w-full flex items-center min-h-full justify-center bg-gradient '>
			{children}
		</div>
	)
}

export default ProtectedLayout
