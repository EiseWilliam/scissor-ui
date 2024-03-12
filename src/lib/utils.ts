import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export async function SendRequest(url: string, method: string, data: any) {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data)
  };
  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options : Intl.DateTimeFormatOptions= {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // timeZone: 'GMT+1',
    hourCycle: 'h12'
  };
  return date.toLocaleString('en-US', options);
}

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api'
});

/**
 * Fetches data from the specified URL using axios.
 *
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to the fetched data.
 */
export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
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
export const request = axiosInstance