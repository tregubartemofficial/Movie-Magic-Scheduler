import React from "react";
import { movies } from "../data";
import { formatTimeToUTC } from "../App";

const formatTimeToMin = (time) => {
  const [hours, min] = time?.split(":");
  return +hours * 60 + +min;
};

const MovieSuggest = ({ userPreferences }) => {
  let movieTimeIndex = 0;
  
  const filteredMovies = movies
    .filter((movie) => {
      return movie.dayOfWeek === new Date(userPreferences.date).getDay();
    })
    .filter((movie) => {
      return movie.movieStarts.some((movieStartTime, i) => {
        if (userPreferences?.startTime) {
          movieTimeIndex = i;
          return (
            movie.movieEnds[i] <= formatTimeToMin(userPreferences.endTime) &&
            movieStartTime >= formatTimeToMin(userPreferences.startTime)
          );
        }
        return false;
      });
    })
    .sort((a, b) => {
      if (userPreferences.preferUnfilledCinema) {
        return a.loadPercentage - b.loadPercentage;
      }
      return b.rating - a.rating;
    });

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
          <p>
            {formatTimeToUTC(filteredMovies[0].movieStarts[movieTimeIndex])} -
            {formatTimeToUTC(filteredMovies[0].movieEnds[movieTimeIndex])}
          </p>
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
