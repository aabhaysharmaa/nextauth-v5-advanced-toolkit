"use client";


import { useSession } from "next-auth/react";


const useCurrentUser = () => {
	try {
		const session = useSession();
		return session.data?.user
	} catch (error) {
		console.log("Error in useCurrentUser :", error)
		return null
	}
}

export default useCurrentUser
