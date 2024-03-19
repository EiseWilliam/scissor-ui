import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputGroupProps = {
	label: string;
	id: string;
	placeholder: string;
	type: string;
	error?: string;
	className?: string;
	fn?: any;
};

export const InputGroup: React.FC<InputGroupProps> = ({
	className,
	label,
	id,
	placeholder,
	type,
	error,
	fn,
	...props
}) => {
	return (
		<div className={cn("flex flex-col space-y-1.5  min-w-80", className)}>
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				placeholder={placeholder}
				type={type}
				{...props}
				{...fn}
			/>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
};
