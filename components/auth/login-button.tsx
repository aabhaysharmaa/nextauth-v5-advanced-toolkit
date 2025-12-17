"use client";

import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'




interface LoginButtonProps {
	child?: boolean;
	mode?: "model" | "redirect";
	children: ReactNode
}


const LoginButton = ({ children, mode = "redirect" }: LoginButtonProps) => {
	const router = useRouter();
	const onClick = () => {
		router.push("/auth/login")
	}

	if (mode === "model") {
		return (
			<span className='text-white text-4xl font-bold'>
				Modal
			</span>
		)
	}


	return (
		<div onClick={onClick}>
			{children}
		</div>
	)
}

export default LoginButton
