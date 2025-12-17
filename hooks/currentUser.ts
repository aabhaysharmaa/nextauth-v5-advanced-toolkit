import { auth } from "@/auth";

const currentUser = async () => {
	try {
		const session = await auth()
		return session?.user
	} catch (error) {
		console.log("Error in useCurrentUser :", error)
		return null
	}
}

export default currentUser; 