import React, { useState } from "react";
import Hero from "./components/Hero";
import TaskAdd from "./components/TaskAdd";
import TaskList from "./components/TaskList";
import { useTaskMateAll } from "./hook/taskmateHook";
import { useDeleteTaskMate } from "./hook/taskmateHook";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const {
    data: TaskMateAll,
    isLoading: isTaskMateLoading,
    isError: isTaskMateError,
  } = useTaskMateAll();
  const deleteMutation = useDeleteTaskMate();

  const [task, setTask] = useState({
    id: 0,
    name: "",
  });
  const editTaskmate = (selectedTask) => {
    setTask((prev) => ({
      ...prev,
      id: selectedTask.id,
      name: selectedTask.name,
    }));
  };
  const deleteTaskmate = async (selectedTask) => {
    await deleteMutation.mutateAsync(selectedTask.id);

    toast.success("Task deleted successfully!");
    setTask({
      id: 0,
      name: "",
    });
  };
  return (
    <div className="bg-primary-subtle min-vh-100  ">
      <Hero />
      <TaskAdd task={task} />
      <TaskList
        data={TaskMateAll}
        editTaskmate={editTaskmate}
        deleteTaskmate={deleteTaskmate}
      />
    </div>
  );
};

export default App;
