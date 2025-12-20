import currentUser from "@/hooks/currentUser"
import { NextResponse } from "next/server"




export async function GET() {
	const user = await currentUser();
	if (user?.role === "ADMIN") {
		return NextResponse.json({ success: "Allowed API route" })
	}
	return new NextResponse(null, { status: 403 })
}

