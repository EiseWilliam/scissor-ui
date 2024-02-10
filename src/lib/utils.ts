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