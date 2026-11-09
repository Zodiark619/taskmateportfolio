import React, { useEffect, useState } from "react";
import { useCreateTaskMate, useUpdateTaskMate } from "../hook/taskmateHook";
import toast, { Toaster } from "react-hot-toast";
const TaskAdd = ({ task }) => {
  const createMutation = useCreateTaskMate();
  const updateMutation = useUpdateTaskMate();

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
  });
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id ?? 0,
        name: task.name ?? "",
      });
    }
  }, [task]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Task name cannot be empty!");
      return;
    }
    if (formData.id == 0) {
      await createMutation.mutateAsync({
        name: formData.name,
      });

      toast.success("Task created successfully!");
    } else {
      await updateMutation.mutateAsync({
        id: formData.id,
        TaskMate: { name: formData.name },
      });

      toast.success("Task updated successfully!");
    }
    setFormData({
      id: 0,
      name: "",
    });
  };
  return (
    <div className="mt-5 w-50 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="input task here"
            value={formData.name ?? ""}
            onChange={handleChange}
            name="name"
          />

          <button type="submit" className="btn btn-primary">
            {formData.id == 0 ? "Add Task" : "Edit Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskAdd;
