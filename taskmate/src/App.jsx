import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskMate from "./components/TaskMate/TaskMate";
import Exercise from "./components/Exercise/Exercise";
import Navbar from "./components/Navbar";
import MovieMate from "./components/MovieMate/MovieMate";
import MovieMateDetail from "./components/MovieMate/MovieMateDetail";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="bg-primary-subtle min-vh-100  ">
        <Routes>
          <Route path="/" element={<TaskMate />}></Route>
          <Route path="/exercise" element={<Exercise />}></Route>
          <Route path="/moviemate" element={<MovieMate />}></Route>
          <Route path="/moviemate/:id" element={<MovieMateDetail />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
