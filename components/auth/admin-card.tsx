"use client";

import { Card, CardContent, CardHeader } from '../ui/card'



import { Button } from '../ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';
import RoleGate from './role-gate';
import FormSuccess from '../form-success';
import { UserRole } from '@/lib/generated/prisma/enums';


interface AdminCardProps {
	label: string
}


const AdminCard = ({ label }: AdminCardProps) => {

	const onClickAdminApiRoute = () => {
		fetch("/auth/api/admin").then((data) => {
			if (data.ok) {
				toast.success("Allowed API Route!")
			} else {
				toast.error("Forbidden API Route")
			}
		})
	}
	const onClickAdminServerAction = () => {
		admin().then((data) => {
			if (data?.success) {
				toast.success(data.success)
			}
			if (data?.error) {
				toast.error(data.error)
			}
		})
	}

	return (
		<Card className='w-150 flex flex-col'>
			<CardHeader>
				<div className="text-center space-x-2 text-xl font-bold">
					<p>{label}</p>
				</div>
			</CardHeader>
			<CardContent className='space-y-5'>
				<RoleGate allowedRole={UserRole.ADMIN}>
					<FormSuccess message='You are allowed to see this content!' />
				</RoleGate>
				<div className="flex items-center shadow-lg  rounded-md justify-between p-3 ">
					<div className="">
						<p className='font-bold text-sm'>Admin-only API Route</p>
					</div>
					<div className="cursor-pointer" onClick={onClickAdminApiRoute}>
						<Button>Click to test</Button>
					</div>
				</div>
				<div className="flex items-center shadow-md rounded-md justify-between p-3 ">
					<div >
						<p className='font-bold text-sm'>Admin-only Server Action</p>
					</div>
					<div className="cursor-pointer" onClick={onClickAdminServerAction}>
						<Button>Click to test</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default AdminCard
