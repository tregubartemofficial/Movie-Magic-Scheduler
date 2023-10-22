import React from "react";
import { useSelector } from "react-redux";
import { movies } from "../../data";
import { formatTimeToUTC } from "../../App";

const MovieSessions = () => {
  const { date } = useSelector((state) => state.calendar);
  const filteredMovies = movies.filter((movie) => {
    return movie.dayOfWeek === new Date(date).getDay();
  });

  return (
    <>
      {filteredMovies.length > 0 && (
        <article className="wrapper-sessions">
          {filteredMovies.map((movie) => (
            <section key={movie.title} className="flex-center col">
              <h3 className="title-orange">{movie.title}</h3>
              {movie.movieStarts.map((movieStart, i) => {
                const startTime = formatTimeToUTC(movieStart);
                const endTime = formatTimeToUTC(movie.movieEnds[i]);
                return (
                  <p
                    className="session-time"
                    key={i}
                  >{`${startTime} - ${endTime}`}</p>
                );
              })}
            </section>
          ))}
        </article>
      )}
      {filteredMovies.length === 0 && (
        <h3>Choose date to see available movies</h3>
      )}
    </>
  );
};

export default MovieSessions;
