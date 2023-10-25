import { useState, useEffect } from "react";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return [accessToken, setAccessToken];
};

export default useAccessToken;
