"use client";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Loader2 } from "lucide-react";
import { newPassword } from "@/actions/newPassword";
import { useSearchParams } from "next/navigation";


const NewPasswordVerification = () => {
	const params = useSearchParams();
	const token = params.get("token");
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ""
		}
	})

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			newPassword(values, token as string).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data?.success)
				}
			})
		})
	}
	if (!mounted) return null; // ✅ prevents hydration mismatch
	return (
		<CardWrapper headerLabel="Reset Password" backButtonHref="/auth/login" backButtonLabel="Back to login">
			<Form {...form}>
				<form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)} >
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input placeholder="*********" {...field} type="password" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}

					/>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button className="w-full cursor-pointer">{isPending ? <Loader2 className="size-5 animate-spin" /> : "Submit"}</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default NewPasswordVerification;
