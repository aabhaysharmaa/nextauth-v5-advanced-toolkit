"use client";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Loader2 } from "lucide-react";

const ResetForm = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition();
	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: ""
		}
	})

	const onSubmit = (values: z.infer<typeof ResetSchema>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			reset(values).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data?.success)
				}
			})
		})
	}
	return (
		<CardWrapper headerLabel="Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to login">
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} >
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="johndoe@gmail.com" {...field} type="email" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}

					/>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className="w-full cursor-pointer">{isPending ? <Loader2 className="size-5 animate-spin" /> : "sent reset email"}</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default ResetForm
