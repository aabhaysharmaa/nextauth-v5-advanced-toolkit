
"use client";



import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";


import { signOut } from "next-auth/react";


const SettingPage = () => {
	const user = useCurrentUser();
	const onClick = () => {
      signOut();
	}

	return (
		<div className="mx-40">
			{JSON.stringify(user)}
			<Button onClick={onClick} className="text-center">SignOut</Button>
		</div>
	)
}

export default SettingPage
