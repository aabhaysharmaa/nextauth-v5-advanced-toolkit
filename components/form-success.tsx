
"use client";

import { FaCheckCircle } from "react-icons/fa";


interface FormSuccessProps {
	message?: string
}

const FormSuccess = ({ message }: FormSuccessProps) => {
	if (!message) return null;
	return (
		<div className="p-3 text-lg bg-emerald-500/20 text-emerald-400 flex rounded-md  items-center justify-start  space-x-2">
			<FaCheckCircle className="size-4" />
			<p>{message}</p>
		</div>
	)
}

export default FormSuccess
