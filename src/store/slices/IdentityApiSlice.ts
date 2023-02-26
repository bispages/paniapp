import { User } from 'types';
import { ApiSlice } from './ApiSlice';

export const IdentityApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => `users`,
    }),
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery } = IdentityApiSlice;

export const { getUsers } = IdentityApiSlice.endpoints;
