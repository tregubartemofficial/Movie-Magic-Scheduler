import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../redux/userSlice";

const Header = () => {
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({
    clientId:
      "117651172871-gbr6jcrh7l50rrtp3kedr9dsbjr9lob4.apps.googleusercontent.com",
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      localStorage.setItem("access_token", tokenResponse.access_token);
      dispatch(setUser({ userInfo }));
      dispatch(setIsLoggedIn(true));
      setAccessToken(tokenResponse.access_token);
    },
    scope:
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.acls",
  });

  const googleLogout = async () => {
    try {
      await axios.post("https://accounts.google.com/o/oauth2/revoke", null, {
        params: {
          token: accessToken,
        },
      });
      localStorage.removeItem("access_token");
      dispatch(setIsLoggedIn(false));
      dispatch(setUser({}));
      setAccessToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header" role="banner">
      <nav
        className="navigation"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link to="/" className="link" aria-label="Go to Select movie page">
          Select movie
        </Link>
        <Link
          to="/movie-catalog"
          className="link"
          aria-label="Go to Movies page"
        >
          Movies
        </Link>
        {accessToken ? (
          <button className="button" onClick={googleLogout}>
            Sign out
          </button>
        ) : (
          <button className="button" onClick={googleLogin}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
