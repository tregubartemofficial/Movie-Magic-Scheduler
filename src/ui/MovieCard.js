import React, { useState } from "react";
import { formatTimeToUTC } from "../App";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      key={movie.title}
      className={`card ${isFlipped ? "is-flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-face card-face--front">
        <h2 className="title-movie">{movie.title}</h2>
        <p>
          <b>+{movie.ageLimit}</b> {movie.genre}
        </p>
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => {
            const isActive = i < movie.rating;
            return (
              <React.Fragment key={i}>
                <input
                  type="radio"
                  className="star-input"
                  name="rating"
                  id={`rs${i}`}
                  disabled
                />
                <label
                  className={`star ${isActive ? "" : "star-inactive"}`}
                  htmlFor={`rs${i}`}
                />
              </React.Fragment>
            );
          })}
        </div>
        {movie.movieStarts.map((movieStart, i) => {
          const startTime = formatTimeToUTC(movieStart);
          const endTime = formatTimeToUTC(movie.movieEnds[i]);
          return (
            <div className="time-table" key={i}>
              <div className="time">
                <p key={i}>{`${startTime} - ${endTime}`}</p>
              </div>
              <p className="ticket-price">{movie.ticketPrice} $</p>
            </div>
          );
        })}
        <h3>
          Click on card to see more about movie
        </h3>
      </div>
      <div className="card-face card-face--back">
        <h2 className="title-movie">{movie.title}</h2>
        <p>{movie.description}</p>
      </div>
    </section>
  );
};

export default MovieCard;
