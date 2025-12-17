import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Header from "./card-header";
import Socials from "./socials";
import BackButton from "./back-button";



interface CardWrapperProps {
	headerLabel?: string;
	backButtonHref?: string;
	socials?: boolean
	children: ReactNode,
	backButtonLabel : string

}

const CardWrapper = ({ headerLabel, backButtonHref, backButtonLabel ,  socials, children }: CardWrapperProps) => {

	return (
		<Card className="w-100  shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>
			{socials &&
				<CardFooter>
					<Socials />
				</CardFooter>}
			<CardFooter>
			<BackButton backButtonLabel={backButtonLabel} backButtonHref={backButtonHref} />
			</CardFooter>
		</Card>
	)
}

export default CardWrapper
