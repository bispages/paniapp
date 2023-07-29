import { User } from 'types';
import { ApiSlice } from './ApiSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const transformResponse = (response: Array<any>) => {
  if (Array.isArray(response)) {
    return response.map((item) => ({
      ...item,
      count: 0,
      initialCount: 0
    }))
  }
  return response;
}

export const IdentityApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[] | User, void | string>({
      query: userId => `users/${userId}`,
    }),
    getPlaces: builder.query<User[], void | string>({
      query: (search) => {
        console.log(search,"Search")
        return `places?query=${search}`
      },
    }),
    getNearUsers: builder.query<User[], void | string>({
      query: userId => `users/nearby/${userId}`,

    }),
    getFavUsers: builder.query<User[], string>({
      query: userId => `users/fav/${userId}`,
    }),
    getMaterials: builder.query<User[], void>({
      query: () => `materials`,
    }),
    getMyOrderList: builder.query<User[], { userId: string; pageNo?: number; pageSize?: number }>({
      query: ({ userId, pageNo = 0, pageSize = 10 }) =>
        `estimates?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    getShopOrderList: builder.query<User[], { userId: string; pageNo?: number; pageSize?: number }>({
      query: ({ userId, pageNo = 0, pageSize = 10 }) =>
        `estimates?userId=${userId}&pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    getEstimateDet: builder.query<User[], string>({
      query: estimateId => `estimates/${estimateId}`,
    }),
    updateUserProfile: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'users/updateProfile', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
    // updateProfilePhoto: builder.mutation<User, User>({
    //   query: function (data) {
    //     return { url: 'users/updateProfilePhoto', method: 'PUT', body: { ...data } };
    //   },
    //   invalidatesTags: ['User'],
    // }),
    addEstimate: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'estimates/add', method: 'POST', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
    updateEstimate: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'estimates/update', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
    sendEstimate: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'estimates/update', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
    setFavUser: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'users/fav/add', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: ApiSlice }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => 'materials',
      transformResponse,
    }),
  }),
});

export const { useFetchDataQuery } = api;

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserProfileMutation,
  useUpdateEstimateMutation,
  useGetNearUsersQuery,
  useGetMaterialsQuery,
  useLazyGetMaterialsQuery,
  useGetFavUsersQuery,
  useGetMyOrderListQuery,
  useGetShopOrderListQuery,
  useGetEstimateDetQuery,
  useSendEstimateMutation,
  useSetFavUserMutation,
  useGetPlacesQuery,
  useAddEstimateMutation,
  useUpdateProfilePhotoMutation,
  
} = IdentityApiSlice;

export const {
  getUsers,
  updateUserProfile,
  getNearUsers,
  getMaterials,
  getFavUsers,
  getShopOrderList,
  getMyOrderList,
  getEstimateDet,
  setFavUser,
  sendEstimate,
  updateEstimate,
  addEstimate,
  updateProfilePhoto,
  getPlaces,
} = IdentityApiSlice.endpoints;
