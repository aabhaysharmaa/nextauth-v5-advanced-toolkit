"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface LoaderProps {
	text?: string
	isPending: boolean
}

const Loader = ({ text, isPending }: LoaderProps) => {
	return (
		<div className="flex">
			<Button className="w-full">
				{isPending ? <Loader2 className="size-5 animate-spin animation" /> : text}
			</Button>
		</div>
	)
}

export default Loader
