import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}


export function formatDate(dateString: string) {
	const date = new Date(dateString);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		// timeZone: 'GMT+1',
		hourCycle: "h12",
	};
	return date.toLocaleString("en-US", options);
}

import axios from "axios";
import { UseAuthContext } from "@/context/auth-context";

export const api = axios.create({
	baseURL: "https://scissor-api-bosc.onrender.com/api",
});
/**
 * Fetches data from the specified URL using axios.
 *
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to the fetched data.
 */
export const fetcher = async (url: string) => {
	return api.get(url).then((res) => res.data);
};

// api.interceptors.request.use(config => {
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export const authenticatedFetcher = async (url: string) => {
	const { accessToken } = UseAuthContext();

	if (accessToken) {
		return api
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => res.data);
	}
	return false;
};

// // biome-ignore lint/suspicious/noExplicitAny: <explanation>
// export const poster = async (url: string, data: Record<string, any>, token: string | null = null) => {
//   const config = {
//     headers: {
//       accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: null
//     }
//   };

//   if (token) {
//     config.headers[Authorization] = `Bearer ${token}`;
//   }

//   return axiosInstance.post(url, data, config);
// }
export const request = api;
export const axiosRequest = api;