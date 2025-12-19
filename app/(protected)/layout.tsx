import NavBar from '@/components/auth/navbar';
import { ReactNode } from 'react';
const ProtectedLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='w-full flex items-center flex-col h-full justify-center bg-gradient  gap-y-10'>
			<NavBar/>
			{children}
		</div>
	)
}

export default ProtectedLayout
