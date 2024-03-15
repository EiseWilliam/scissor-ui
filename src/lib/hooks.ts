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
