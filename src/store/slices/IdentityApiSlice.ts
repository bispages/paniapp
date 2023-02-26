import { User } from 'types';
import { ApiSlice } from './ApiSlice';

export const IdentityApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
<<<<<<< HEAD
    
=======
    getUsers: builder.query<User[], void>({
      query: () => `users`,
    }),
>>>>>>> b48ef9b6e85b963949c3598effb1c1a2f6a4b583
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery } = IdentityApiSlice;

export const { getUsers } = IdentityApiSlice.endpoints;
