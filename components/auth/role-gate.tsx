"use client";


import React, { ReactNode } from 'react'
import FormError from '../form-error'
import { useCurrentRole } from '@/hooks/useCurrentRole'


interface RoleGateProps {
	children: ReactNode
	allowedRole: "USER" | "ADMIN"
}


const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = useCurrentRole();
	if (role !== allowedRole) {
		return (
			<FormError message='You do not have permission to view this content' />
		)
	}
	return (
		<div>
			{children}
		</div>
	)
}

export default RoleGate
