import { Route, Routes } from "react-router-dom";
import Exercise from "./components/Exercise/Exercise";
import Login from './components/Login';
import MovieMate from "./components/MovieMate/MovieMate";
import MovieMateDetail from "./components/MovieMate/MovieMateDetail";
import Navbar from "./components/Navbar";
import ProtectedRoute from './components/ProtectedRoute';
import TaskMate from "./components/TaskMate/TaskMate";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="bg-primary-subtle min-vh-100  ">
        <Routes>
          <Route path="/" element={<TaskMate />}></Route>
          <Route path="/exercise" element={<Exercise />}></Route>
          <Route path="/login" element={<Login />} />

 <Route element={<ProtectedRoute />}>
          <Route path="/moviemate" element={<MovieMate />}></Route>
          <Route path="/moviemate/:id" element={<MovieMateDetail />}></Route>
 </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
