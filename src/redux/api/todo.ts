import { apiEndpoint } from "./apiEndpoint";
import ITask from "../../models/ITask";

const todoApi = apiEndpoint.injectEndpoints({
  endpoints: (builder) => ({
    createTask: builder.mutation({
      query: ({ body }: { body: ITask }) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllTasks: builder.query<ITask[], unknown>({
      query: () => ({
        url: `/tasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<ITask, unknown>({
      query: ({ id }: { id: string }) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    editTask: builder.mutation({
      query: ({ task, id }: { task: Partial<ITask>; id: string }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTaskByIdQuery,
} = todoApi;
