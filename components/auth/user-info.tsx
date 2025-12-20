
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge'


import { ExtendedUser } from '@/next-auth';

interface UserInfoProps {
	user?: ExtendedUser | null | undefined ;
	label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {

	return (
		<Card className='w-150 p-5'>
			<CardHeader>
				<p className='text-xl w-full font-semibold text-center'>{label}</p>
			</CardHeader>
			<CardContent className='space-y-3'>
				<div className="flex justify-between items-center rounded-lg p-3 shadow-md flex-row">
					<p className='text-sm font-semibold'>ID</p>
					<p className='truncate text-sm max-w-45 font-mono p-1 bg-slate-100 rounded-md'>{user?.id || ""}</p>
				</div>
				<div className="flex justify-between items-center rounded-lg p-3 shadow-md flex-row">
					<p className='text-sm font-semibold'>Name</p>
					<p className='truncate text-sm max-w-45 font-mono p-1 bg-slate-100 rounded-md'>{user?.name || ""}</p>
				</div>
				<div className="flex justify-between items-center rounded-lg p-3 shadow-md flex-row">
					<p className='text-sm font-semibold'>Email</p>
					<p className='truncate text-sm max-w-45 font-mono p-1 bg-slate-100 rounded-md'>{user?.email || ""}</p>
				</div>
				<div className="flex justify-between items-center rounded-lg p-3 shadow-md flex-row">
					<p className='text-sm font-semibold'>Role</p>
					<p className='truncate text-sm max-w-45 font-mono p-1 bg-slate-100 rounded-md'>{user?.role || ""}</p>
				</div>
				<div className="flex justify-between items-center rounded-lg p-3 shadow-md flex-row">
					<p className='text-sm font-semibold'>Two Factor Authentication</p>
					<Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
						{user?.isTwoFactorEnabled ? "ON" : "OFF"}
					</Badge>
				</div>
			</CardContent>
		</Card>
	)
}

export default UserInfo
