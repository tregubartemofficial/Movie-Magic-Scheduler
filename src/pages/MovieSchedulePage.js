import React, { useState } from 'react'
import MovieSuggest from '../components/MovieSuggest';
import Divider from '../ui/Divider';
import MovieSessions from '../components/MovieSessions';
import UserTimeForm from '../components/UserTimeForm';

const MovieSchedulePage = () => {
    const [userPreferences, setUserPreferences] = useState({
      date: new Date().toISOString().split("T")[0],
    });

    const handleUserPreferences = (userPreferences) => {
      setUserPreferences(userPreferences);
    };

  return (
    <div className="wrapper-ticket">
      <div className="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
        <h1 className="font-medium text-2xl text-center">
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