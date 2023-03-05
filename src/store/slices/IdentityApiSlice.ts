import { User } from 'types';
import { ApiSlice } from './ApiSlice';

export const IdentityApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => `users`,
    }),
    updateUserProfile: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'users/updateProfile', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),

    updateEstimate: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'estimates/update', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),

  }),
  overrideExisting: true,
});

export const { 
  useGetUsersQuery, 
  useUpdateUserProfileMutation, 
  useUpdateEstimateMutation } = IdentityApiSlice;

export const { getUsers, updateUserProfile } = IdentityApiSlice.endpoints;


