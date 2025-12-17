import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
	message?: string
}


const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<div className="flex items-center justify-start p-4 bg-destructive/20 text-destructive space-x-2 rounded-md">
			<FaExclamationTriangle className="size-5" />
			<p>{message}</p>
		</div>
	)
}

export default FormError
