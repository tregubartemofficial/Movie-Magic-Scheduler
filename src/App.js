import React, { useState } from "react";
import UserTimeForm from "./components/UserTimeForm";
import MovieSuggest from "./components/MovieSuggest";
import MovieSessions from "./components/MovieSessions";
import Divider from "./ui/Divider";

const App = () => {
  const [userPreferences, setUserPreferences] = useState({});

  const handleUserPreferences = (userPreferences) => {
    setUserPreferences(userPreferences);
  };

  return (
    <main className="wrapper">
      <div className="max-w-2xl bg-amber-600 rounded-3xl">
        <div className="bg-white drop-shadow-2xl rounded-3xl p-4 m-4">
          <h1 className="font-medium text-2xl text-center">
            Movie Magic Scheduler
          </h1>
          <hr className="ticket-divider" />
          <MovieSessions />
          <Divider />
          <UserTimeForm setUserTime={handleUserPreferences} />
          <Divider />
          <MovieSuggest userPreferences={userPreferences} />
        </div>
      </div>
    </main>
  );
};

export default App;
