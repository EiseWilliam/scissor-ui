import { api, fetcher } from "@/lib/utils";
import { useState } from "react";

const useSimpleUrlShorten = (longUrl: string) => {
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [newUrl, setNewUrl] = useState<string[]>([]);
	const endpoint = "url/quick_shorten?url=";
	const handleSubmit = () => {
		api.post(`url/quick_shorten?url=${longUrl}`, {
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				setIsLoading(false);
				setNewUrl(res.data);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});
	};

	return { error, isLoading, newUrl, handleSubmit };
};

export function useAdvancedUrlShorten(
	url: string,
	token: string,
	alias?: string,
) {
	const endpoint = "url/shorten";
	const handleSubmit = () => {
		api
			.post(endpoint, {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: {
					url: url,
					custom_alias: alias,
				},
			})
			.then()
			.catch();
	};
}

export const customAliasIsAvailable = async (
	alias: string,
	accessToken: string | null,
): Promise<boolean> => {
	if (!accessToken) return false;
	try {
		const response = await api.get(`/url/verify_custom?alias=${alias}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data as boolean;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const updateUrlDetails = async (
	shortUrl: string,
	token: string | null,
	{ title, alias },
) => {
	const response = await api.patch(
		`url/my_urls/${shortUrl}`,
		{ title, short_url: alias },
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	if (response.status === 200) {
		return true;
	}
	throw new Error("Failed to update url details");
};
export const createUrl = async (longUrl: string, token: string | null, alais?: string, title?: string) => {
    const response = await api.post(
        "url/shorten",
        {
            url: longUrl,
            custom_alias: alais,
            title: title,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    if (response.status === 200) {
        return response.data;
    }
    throw new Error("Failed to create url");

}
export const deleteUrl = async (shortUrl: string, token: string | null) => {
	const response = await api.delete(`url/my_urls/${shortUrl}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.status === 200) {
		return true;
	}
	throw new Error("Failed to delete url");
};
