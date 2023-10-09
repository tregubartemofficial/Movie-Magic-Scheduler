import React from "react";
import { movies } from "../data";

const convertTime = (time) => {
  const [hours, min] = time?.split(":");
  return +hours * 60 + +min;
};

const MovieSuggest = ({ userPreferences }) => {
  const filteredMovies = movies
    .filter((movie) => {
      return movie.movieStarts.some((startTime, i) => {
        if (userPreferences?.startTime) {
          return (
            movie.movieEnds[i] >= +convertTime(userPreferences.endTime) &&
            startTime >= +convertTime(userPreferences.startTime) &&
            startTime <= +convertTime(userPreferences.endTime)
          );
        }
        return false;
      });
    })
    .sort((a, b) => {
      if (userPreferences.preferUnfilledCinema) {
        return a.loadPercentage - b.loadPercentage;
      } else {
        return b.rating - a.rating;
      }
    });

    console.log(filteredMovies);


  return (
    <section className="flex flex-col items-center content-center p-4">
      {!userPreferences.startTime && (
        <p className="text-lg font-semibold text-orange-700">
          Please enter your preferred time
        </p>
      )}
      {userPreferences?.startTime && filteredMovies[0]?.title && (
        <>
          <h2 className="text-lg font-semibold text-orange-700">
            {filteredMovies[0].title}
          </h2>
          <p>{filteredMovies[0].duration} minutes</p>
          <p>$ {filteredMovies[0].ticketPrice}</p>
        </>
      )}
      {!filteredMovies[0]?.title && userPreferences?.startTime && (
        <p className="text-lg font-semibold text-orange-700">
          No movies available
        </p>
      )}
    </section>
  );
};

export default MovieSuggest;
