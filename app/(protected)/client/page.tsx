"use client";
import UserInfo from '@/components/auth/user-info';
import useCurrentUser from '@/hooks/useCurrentUser'
import React from 'react'

const ClientPage = () => {

	const user = useCurrentUser();
	console.log("client User :",user )
	return (
		<UserInfo user={user} label='📱 Client' />
	)
}

export default ClientPage
