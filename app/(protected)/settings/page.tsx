"use client";

import { Settings } from "@/actions/settings";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import SubmitButton from "@/components/loader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserRole } from "@/lib/generated/prisma/enums";
import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingPage = () => {
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")
	const [isPending, startTransition] = useTransition();
	const user = useCurrentUser();

	const form = useForm<z.infer<typeof settingsSchema>>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			role: user?.role || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
		}
	})

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name || undefined,
				email: user.email || undefined,
				password: undefined,
				newPassword: undefined,
				role: user?.role || undefined,
				isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
			})
		}
	}, [user, form])
	const onSubmit = (values: z.infer<typeof settingsSchema>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			Settings(values).then((data) => {
				if (data?.error) {
					setError(data.error)
				}
				if (data?.success) {
					setSuccess(data.success);
				}
			}).catch(() => setError("Something went Wrong !"))
		})
	}

	return (
		<Card className="w-150">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">⚙️ Settings</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-5">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="John Doe" disabled={isPending} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}

							/>
							{user?.isOAuth === false && (<>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="JohnDoe@gmail.com" disabled={isPending} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>password</FormLabel>
											<FormControl>
												<Input type="password" placeholder="******" disabled={isPending} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="newPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input type="password" placeholder="*******" disabled={isPending} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>)}
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl className="w-full">
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent >
												<SelectItem value={UserRole.ADMIN}>
													ADMIN
												</SelectItem>
												<SelectItem value={UserRole.USER}>
													USER
												</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<FormField
									control={form.control}
									name="isTwoFactorEnabled"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
											<div className="space-y-0.5">
												<FormLabel>Two Factor Authentication</FormLabel>
												<FormDescription>Enable two factor authentication for your account </FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
						<FormSuccess message={success} />
						<FormError message={error} />
						<SubmitButton isPending={isPending} text="Update Setting" />
					</form>
				</Form>
			</CardContent>
		</Card >
	)
}

export default SettingPage
