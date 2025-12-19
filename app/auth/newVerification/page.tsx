/* eslint-disable react-hooks/set-state-in-effect */

"use client";
import { BeatLoader } from "react-spinners";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { newVerification } from "@/actions/newVerification";

const NewVerification = () => {
	const params = useSearchParams();
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const token = params.get("token");

	const onSubmit = useCallback(() => {
		if (!token) {
			return setError("Invalid or missing Token")
		}

		newVerification(token).then((data) => {
			if (data?.success) {
				setSuccess(data.success)
			}
			if (data?.error) {
				setError(data.error)
			}
		})

	}, [token])

	useEffect(() => {
		onSubmit();
	}, [onSubmit])
	return (
		<CardWrapper headerLabel="Email Verification in progress" backButtonLabel="Back to login" backButtonHref="/auth/login">
			<div className="flex flex-col items-center justify-center">
				{!error && !success && (
					<BeatLoader color="skyblue" />
				)}
				{!success && (
					<FormError message={error} />
				)}

				<FormSuccess message={success} />
			</div>
		</CardWrapper>
	)
}

export default NewVerification
