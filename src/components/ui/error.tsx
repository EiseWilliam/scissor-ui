import type { FC } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface WarningProps extends React.HTMLAttributes<HTMLParagraphElement> {
	message: string;
}

const ErrorElement: FC<WarningProps> = ({ message, className, ...props }) => {
	return (
		<p
			className={cn(
				"flex items-center pl-4 py-2 w-full ml-0 gap-2 text-sm rounded-md bg-destructive/20 text-destructive",
				className,
			)}
			{...props}
		>
			<ExclamationTriangleIcon />
			{message}
		</p>
	);
};

export default ErrorElement;
