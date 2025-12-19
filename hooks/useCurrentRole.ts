import { useSession } from "next-auth/react"




export const useCurrentRole = () => {
	try {
		const user = useSession();
		return user.data?.user.role
	} catch (error) {
		console.log("Error in useCurrentRole : ", error)
	}
}