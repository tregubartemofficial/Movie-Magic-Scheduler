import React from "react";
import { movies } from "../data";
import { formatTimeToUTC } from "../App";

const MovieSessions = ({ date }) => {
  const filteredMovies = movies.filter((movie) => {
    return movie.dayOfWeek === new Date(date).getDay();
  })

  return (
    <>
      {filteredMovies.length > 0 && (
        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
          {filteredMovies.map((movie) => (
            <section key={movie.title} className="flex-center flex-col mx-auto">
              <h2 className="font-semibold text-center">{movie.title}</h2>
              {movie.movieStarts.map((movieStart, i) => {
                const startTime = formatTimeToUTC(movieStart);
                const endTime = formatTimeToUTC(movie.movieEnds[i]);
                return <p key={i}>{`${startTime} - ${endTime}`}</p>;
              })}
            </section>
          ))}
        </article>
      )}
      {filteredMovies.length === 0 && (
        <h2 className="font-semibold text-center">
          Choose date to see available movies
        </h2>
      )}
    </>
  );
};

export default MovieSessions;
