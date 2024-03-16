import React from "react";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/bk/button";
import { ButtonProps } from "./bk/button";

// create a show loading with state button
export const LoadButton = (state: boolean, buttonText: string) => {
	return state ? (
		<Button className="w-full" type="submit">
			Sign In
		</Button>
	) : (
		<Button disabled className="w-full">
			<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			Please wait
		</Button>
	);
};
