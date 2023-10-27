import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AiFillGoogleSquare } from "react-icons/ai";
import axios from "axios";
import { setIsLoggedIn, setUser } from "../redux/userSlice";
import FilterModal from "../ui/FilterModal";
import SelectDay from "./SelectDay";
import "../styles/Header.css";

const Header = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const accessTokenExpiration = sessionStorage.getItem("expirationTime");
    const currentTimestamp = new Date().getTime();

    if (accessTokenExpiration && currentTimestamp >= accessTokenExpiration) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("expirationTime");
    } else {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
      }
    }
  }, []);

  const googleLogin = useGoogleLogin({
    clientId:
      "117651172871-gbr6jcrh7l50rrtp3kedr9dsbjr9lob4.apps.googleusercontent.com",
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      const expirationTime =
        new Date().getTime() + tokenResponse.expires_in * 1000;
      sessionStorage.setItem("accessToken", tokenResponse.access_token);
      sessionStorage.setItem("expirationTime", expirationTime);
      dispatch(setUser(userInfo));
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
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("expirationTime");
      dispatch(setIsLoggedIn(false));
      dispatch(setUser({}));
      setAccessToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleModal = () => {
    setOpenFilterModal((prev) => !prev);
    if (!openFilterModal) {
      document.body.classList.add("body-overflow-hidden");
    } else {
      document.body.classList.remove("body-overflow-hidden");
    }
  };

  return (
    <>
      <header className="header" role="banner">
        <nav className="navigation" role="navigation" aria-label="Navigation">
          <Link to="/" className="link" aria-label="Go to movie page">
            Movie Magic Scheduler
          </Link>
          {accessToken ? (
            <button className="button" onClick={googleLogout}>
              Sign out
            </button>
          ) : (
            <button className="button" onClick={googleLogin}>
              Sign in via <AiFillGoogleSquare size="1.5em" />
            </button>
          )}
        </nav>
        {location.pathname === "/" && (
          <div className="filter">
            <button className="button" onClick={handleToggleModal}>
              Filters
            </button>
            <SelectDay />
            <FilterModal
              active={openFilterModal}
              setActive={handleToggleModal}
            />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
