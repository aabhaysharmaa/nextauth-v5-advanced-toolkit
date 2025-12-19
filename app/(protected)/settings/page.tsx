"use server";


import { Button } from "@/components/ui/button";
import currentUser from "@/hooks/currentUser";
import { signout } from "@/hooks/user";





const SettingPage = async () => {
	const user = await currentUser();

	return (
		<form action={signout}>
			<div className="mx-40">
				{JSON.stringify(user)}
				<Button className="text-center" type="submit">SignOut</Button>
			</div>
		</form>

	)
}

export default SettingPage
