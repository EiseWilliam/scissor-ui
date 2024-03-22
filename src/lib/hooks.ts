import { useState } from "react";


type fetchParam = {
	url: string;
	method: string;
};

export function useCopy() {
	const [copiedText, setCopiedText] = useState<string | null>(null);
	async function copy(text: string) {
		if (!navigator?.clipboard) {
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			setCopiedText(null);
			return false;
		}
	}

	return {copiedText, copy}; // Return recentlyCopied state
}
