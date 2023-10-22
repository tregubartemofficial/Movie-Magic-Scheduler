import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Header = () => {
  const google = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      fetchUserCalendar(userInfo, tokenResponse);
    },
  });

  const fetchUserCalendar = async (userInfo, tokenResponse) => {
    console.log("User's information:", userInfo);
    console.log("Token response:", tokenResponse);
    if (userInfo && userInfo.sub) {
      const calendarInfo = axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${userInfo.sub}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      console.log("User's Calendar Info:", calendarInfo.data);
    } else {
      console.log("User's information is not available.");
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
      </nav>
      <button onClick={google}>Sign in</button>
    </header>
  );
};

export default Header;
