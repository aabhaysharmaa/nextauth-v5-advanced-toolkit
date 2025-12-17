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
import Loader from "../loader";


const LoginForm = () => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")

	const handleFormSubmit = (values: z.infer<typeof LoginSchema>) => {
		startTransition(() => {
			login(values).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data?.success)
				}
			})
		})
	}

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})
	if (!mounted) return null; // ✅ prevents hydration mismatch
	return (
		<CardWrapper backButtonLabel="Don't have an account?" headerLabel="Welcome Back" backButtonHref="/auth/register" socials>
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleFormSubmit)} >

					<div className="space-y-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="johndoe@gmail.com"  {...field} />
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
										<Input placeholder="********" type="password"  {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormSuccess message={success} />
						<FormError message={error} />
					</div>
					<Loader isPending={isPending} text="Log In" />
				</form>
			</Form>
		</CardWrapper>
	)
}

export default LoginForm
