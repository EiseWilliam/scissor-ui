import { api, fetcher } from "@/lib/utils";
import { useState } from "react";

const useSimpleUrlShorten = (url: string) =>{
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newUrl, setNewUrl] = useState<string[]>([]);
    const endpoint = "url/quick_shorten?url="
    const handleSubmit = () => {fetch(`http://localhost:8000/api/url/quick_shorten?url=${longUrl}`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) return res.json();
				setError(res.status.toString());
			})
			.then((data) => {
				setIsLoading(false);
                setNewUrl(data)
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});}

    return {error, isLoading, newUrl, handleSubmit}
}


export function useAdvancedUrlShorten(url: string, token: string,  alias?: string) {
    const endpoint = "url/shorten"
    const handleSubmit = () => {
        api.post(endpoint, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: {
                url: url,
                custom_alias: alias
            }
        }).then().catch()
    }
}