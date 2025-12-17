"use client";
import { signIn } from "next-auth/react"

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";


const Socials = () => {
	const handleClick = (provider: "google" | "github") => {
		signIn(provider)
	}


	return (
		<div className="flex items-center w-full space-x-2">
			<Button className="w-1/2 cursor-pointer" variant="outline" onClick={() => handleClick("google")}>
				<FcGoogle className="size-5" />
			</Button>
			<Button className="w-1/2 cursor-pointer" variant="outline" onClick={() => handleClick("github")}>
				<FaGithub className="size-5" />
			</Button>
		</div>
	)
}

export default Socials
