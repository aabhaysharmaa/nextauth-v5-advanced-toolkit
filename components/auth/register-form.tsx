"use client";


import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import CardWrapper from "./card-wrapper";
import { RegisterSchema } from "@/schemas/index"
import { useState, useTransition } from "react";

import FormSuccess from "../form-success";
import FormError from "../form-error";
import Loader from "../loader";
import { register } from "@/actions/register";



const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")

	const handleFormSubmit = (values: z.infer<typeof RegisterSchema>) => {
		startTransition(() => {
			register(values).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data?.success)
				}
			})
		})
	}

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""

		}
	})
	return (
		<CardWrapper backButtonLabel="Already have an account?" headerLabel="Create an account" backButtonHref="/auth/login" socials>
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(handleFormSubmit)}>

					<div className="space-y-5">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Abhay Sharma"  {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
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
										<Input placeholder="********"  {...field} />
									</FormControl>
									<FormMessage />

								</FormItem>
							)}
						/>
								<FormSuccess message={success} />
									<FormError message={error} />
					</div>
					<Loader isPending={isPending} text="Create an account" />
				</form>
			</Form>
		</CardWrapper>
	)
}

export default RegisterForm
