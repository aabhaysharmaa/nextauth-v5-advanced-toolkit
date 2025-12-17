import { Poppins } from "next/font/google"



const font = Poppins({
	subsets: ['latin'],
	weight: ["600"]
})


interface HeaderProps {
	label?: string
}

const Header = ({ label }: HeaderProps) => {
	return (
		<div className='flex flex-col space-y-3 w-full items-center'>
			<h2 className={`${font.className} text-3xl font-semibold `}>🔐 Auth</h2>
			<p className="text-muted-foreground text-sm ">{label}</p>
		</div>
	)
}

export default Header
