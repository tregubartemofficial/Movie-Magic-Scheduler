import React from "react";
import MovieSuggest from "../components/movieCatalog/MovieSuggest";
import MovieSessions from "../components/movieCatalog/MovieSessions";
import UserTimeForm from "../components/movieCatalog/UserTimeForm";
import Divider from "../ui/Divider";

const MovieSchedulePage = () => {
  return (
    <div className="wrapper-ticket">
      <div>
        <h1>Movie Magic Scheduler</h1>
        <Divider />
        <MovieSessions />
        <Divider />
        <UserTimeForm />
        <Divider />
        <MovieSuggest />
      </div>
    </div>
  );
};

export default MovieSchedulePage;
