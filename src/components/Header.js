import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";

async function getCalendarEvents(credential, clientId) {
  // const decoded = jwtDecode(credential);
  // try {
  //   const response = await fetch(
  //     `https://www.googleapis.com/calendar/v3/calendars/${decoded.email}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${}`,
  //       },
  //     }
  //   );
  //   if (!response.ok) {
  //     const errorMessage = await response.text();
  //     console.error(
  //       `API request failed with status ${response.status}: ${errorMessage}`
  //     );
  //     throw new Error("Failed to fetch calendar events");
  //   }
  //   const data = await response.json();
  // } catch (error) {
  //   console.error(error);
  // }
  alert("Not ready yet =(");
}

const Header = () => {
  const handleLogin = (response) => {
    const { clientId, credential } = response;
    getCalendarEvents(credential, clientId);
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
      <GoogleLogin
        onSuccess={handleLogin}
        onError={(error) => console.error(error)}
        type="icon"
      />
    </header>
  );
};

export default Header;
