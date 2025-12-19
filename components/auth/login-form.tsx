"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import CardWrapper from "./card-wrapper";
import { LoginSchema } from "@/schemas/index"
import { useEffect, useState, useTransition } from "react";
import { login } from "@/actions/login";
import FormSuccess from "../form-success";
import FormError from "../form-error";
import SubmitButton from "../loader";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginForm = () => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	const params = useSearchParams();
	const errorMessage = params.get("error") === "OAuthAccountNotLinked" ? "Email is already Linked with OAuth" : ""
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")

	const handleFormSubmit = (values: z.infer<typeof LoginSchema>) => {
		console.log("Submitting...")
		setError("")
		setSuccess("")
		startTransition(() => {
			login(values).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data?.success)
				}
				if (data?.twoFactor) {
					setShowTwoFactor(true)
				}
			})
		})
	}

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
			code: ""
		}
	})
	if (!mounted) return null; // prevents hydration mismatch
	return (
		<CardWrapper backButtonLabel="Don't have an account?" headerLabel="Welcome Back" backButtonHref="/auth/register" socials>
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleFormSubmit)} >
					{showTwoFactor && (
						<div className="space-y-5">
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code</FormLabel>
										<FormControl>
											<Input placeholder="12345" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					)}
					{!showTwoFactor && (
						<>
							<div className="space-y-5">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input disabled={isPending} placeholder="johndoe@gmail.com"  {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-5">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input placeholder="********" disabled={isPending} type="password"  {...field} />
											</FormControl>
											<div className="flex justify-start cursor-pointer ">
												<Button variant="link" className=" cursor-pointer p-1">
													<Link href="/auth/reset">
														Forgot Password ? </Link>
												</Button>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

							</div>
							<FormSuccess message={success} />
							<FormError message={error || errorMessage} />
						</>
					)}
					<SubmitButton isPending={isPending} text="Log In" />
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
