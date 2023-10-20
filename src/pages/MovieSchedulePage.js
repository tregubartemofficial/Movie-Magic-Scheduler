import React, { useState } from 'react'
import MovieSuggest from '../components/movieCatalog/MovieSuggest';
import MovieSessions from '../components/movieCatalog/MovieSessions';
import UserTimeForm from '../components/movieCatalog/UserTimeForm';
import Divider from '../ui/Divider';

const MovieSchedulePage = () => {
    const [userPreferences, setUserPreferences] = useState({
      date: new Date().toISOString().split("T")[0],
    });

    const handleUserPreferences = (userPreferences) => {
      setUserPreferences(userPreferences);
    };

  return (
    <div className="wrapper-ticket">
      <div>
        <h1>
          Movie Magic Scheduler
        </h1>
        <Divider />
        <MovieSessions date={userPreferences.date} />
        <Divider />
        <UserTimeForm
          userPreferences={userPreferences}
          setUserPreferences={handleUserPreferences}
        />
        <Divider />
        <MovieSuggest userPreferences={userPreferences} />
      </div>
    </div>
  );
}

export default MovieSchedulePage