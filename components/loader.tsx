"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface LoaderProps {
	text?: string
	isPending: boolean
}

const SubmitButton = ({ text, isPending }: LoaderProps) => {
	return (
		<div className="flex" >
			<Button  className="w-full cursor-pointer" type="submit">
				{isPending ? <Loader2 className="size-5 animate-spin animation" /> : text}
			</Button>
		</div>
	)
}

export default SubmitButton
