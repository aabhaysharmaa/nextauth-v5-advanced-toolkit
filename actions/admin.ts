"use server"

import currentUser from "@/hooks/currentUser"




export const admin = async () => {
	try {
		const user = await currentUser();
		if (user?.role === "ADMIN") {
			return { success: "Allowed server Action" }
		}
		return { error: "Forbidden server Action" }
	} catch (error) {
		console.log("Admin action Error", error)
	}
}