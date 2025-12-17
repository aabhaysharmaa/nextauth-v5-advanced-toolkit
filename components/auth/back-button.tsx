
import { Button } from "../ui/button";
import Link from "next/link";


interface BackButtonProps {
	backButtonLabel: string;
	backButtonHref?: string
}


const BackButton = ({ backButtonHref, backButtonLabel }: BackButtonProps) => {
	return (
		<Button className=" text-black/60 flex items-center w-full justify-center" variant="link">
			<Link href={backButtonHref || ""}>{backButtonLabel}</Link>
		</Button>
	)
}

export default BackButton
