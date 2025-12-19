"use client";
import { Button } from '../ui/button'
import Link from 'next/link'
import UserButton from './user-button'

import { usePathname } from 'next/navigation';


const NavBar = () => {
	const pathname = usePathname();
	return (
		<nav className='bg-secondary w-150 flex justify-between   items-center p-4 rounded-xl shadow-md '>
			<div className="space-x-5">
				<Button variant={pathname === "/server" ? "outline" : "default"} >
					<Link href="/server">Server</Link>
				</Button>
				<Button variant={pathname === "/client" ? "outline" : "default"}>
					<Link href="/client">Client</Link>
				</Button>
				<Button variant={pathname === "/admin" ? "outline" : "default"}>
					<Link href="/admin">Admin</Link>
				</Button>
				<Button variant={pathname === "/settings" ? "outline" : "default"}>
					<Link href="/settings">Settings</Link>
				</Button>
			</div>
			<UserButton />
		</nav>
	)
}

export default NavBar
