"use server";

import UserInfo from '@/components/auth/user-info'
import currentUser from '@/hooks/currentUser'


const ServerPage = async () => {
	const user = await currentUser();
	console.log("Server User :",user )

	return (
		<UserInfo user={user} label='💻 Server' />
	)
}

export default ServerPage
