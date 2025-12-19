"use client";

import AdminCard from "@/components/auth/admin-card"
import useCurrentUser from "@/hooks/useCurrentUser"


const AdminPage = () => {
	const user = useCurrentUser();
	return (
		<AdminCard label="🔑 Admin"  user={user}/>
	)
}

export default AdminPage
