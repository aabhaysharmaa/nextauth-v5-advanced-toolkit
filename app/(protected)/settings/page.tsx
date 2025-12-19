"use server";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import currentUser from "@/hooks/currentUser";
import { signout } from "@/hooks/user";





const SettingPage = async () => {
	const user = await currentUser();

	return (
	<div className="">
		
	</div>
	)
}

export default SettingPage
