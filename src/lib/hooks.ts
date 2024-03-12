import { useEffect, useState } from 'react';
import AuthContext from "@/context/auth-context";
import { useContext, useDebugValue } from "react";


const useAuth = () => {
  // const { auth, setAuth } = useContext(AuthContext);
  // useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
  return useContext(AuthContext);
}

export default useAuth;

type fetchParam = {
  url: string
  method: string
}


interface RequestState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export const useRequest = <T>(
  url: string,
  defaultState: boolean = true,
  method: 'POST' | 'PUT'| 'GET' | 'DELETE' = 'GET',
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
body: any | null = null,
  headers: Record<string, string> = {}
): RequestState<T> => {
  const [requestState, setRequestState] = useState<RequestState<T>>({
    data: null,
    isLoading: defaultState,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setRequestState((prevState) => ({ ...prevState, loading: true }));

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data: T = await response.json();
        setRequestState({ data, isLoading: false, error: null });
      } catch (error) {
        setRequestState({ data: null, isLoading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  return requestState;
};



export function useCopy() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [recentlyCopied, setRecentlyCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setRecentlyCopied(true); // Set recentlyCopied to true after successful copy
      return true;
    } catch (error) {
      setCopiedText(null);
      setRecentlyCopied(false); // Set recentlyCopied to false if copy fails
      return false;
    }
  };

  return [copiedText, copy, recentlyCopied]; // Return recentlyCopied state
}
