import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppUser } from "../types";
import { userAPIEndpoint } from "../config";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: userAPIEndpoint }),
  endpoints: (builder) => ({
    getUser: builder.query<AppUser, string>({
      query: (userId) => `/?userId=${userId}`,
    }),
    updateUser: builder.mutation<void, AppUser>({
      query: (user) => ({
        url: "",
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: "",
        method: "DELETE",
        body: { userId: userId },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
  userAPI;
