import React, { useState } from "react";
import Hero from "./Hero";
import TaskAdd from "./TaskAdd";
import TaskList from "./TaskList";
import { useDeleteTaskMate, useTaskMateAll } from "../../hook/taskmateHook";
import toast, { Toaster } from "react-hot-toast";
const TaskMate = () => {
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
    <>
      <Hero />
      <TaskAdd task={task} />
      <TaskList
        data={TaskMateAll}
        editTaskmate={editTaskmate}
        deleteTaskmate={deleteTaskmate}
      />
    </>
  );
};

export default TaskMate;
