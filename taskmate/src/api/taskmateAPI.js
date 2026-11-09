import { api } from "./axios";

export const getTaskMateAll = async () => {
  const response = await api.get("/TaskMate");
  return response.data;
};
export const getTaskMate = async (id) => {
  const response = await api.get(`/TaskMate/${id}`);
  return response.data;
};

export const createTaskMate = async (TaskMate) => {
  const response = await api.post("/TaskMate", TaskMate);
  return response.data;
};
export const updateTaskMate = async (id, TaskMate) => {
  const response = await api.put(`/TaskMate/${id}`, TaskMate);
  return response.data;
};
export const deleteTaskMate = async (id) => {
  const response = await api.delete(`/TaskMate/${id}`);
  return response.data;
};
