import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTaskMateAll,
  getTaskMate,
  updateTaskMate,
  createTaskMate,
  deleteTaskMate,
} from "../api/taskmateAPI";

export const useTaskMateAll = () => {
  return useQuery({
    queryKey: ["TaskMate"],
    queryFn: getTaskMateAll,
  });
};
export const useTaskMate = (id) => {
  return useQuery({
    queryKey: ["TaskMate", id],
    queryFn: () => getTaskMate(id),
    enabled: !!id,
  });
};

export const useCreateTaskMate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskMate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TaskMate"],
      });
    },
  });
};
export const useUpdateTaskMate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, TaskMate }) => updateTaskMate(id, TaskMate),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["TaskMate"],
      });

      queryClient.invalidateQueries({
        queryKey: ["TaskMate", variables.id],
      });
    },
  });
};
export const useDeleteTaskMate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskMate,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TaskMate"],
      });
    },
  });
};
