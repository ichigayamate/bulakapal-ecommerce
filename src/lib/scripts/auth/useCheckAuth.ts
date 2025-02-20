import {useEffect, useState} from "react";

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const cookie = document.cookie;
      return cookie.includes("authorization");
    };
    checkAuth().then((auth) => setIsAuthenticated(auth));
  }, []);

  return isAuthenticated;
}

