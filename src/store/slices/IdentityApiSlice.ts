import { User } from 'types';
import { ApiSlice } from './ApiSlice';

export const IdentityApiSlice = ApiSlice.injectEndpoints({
 
  endpoints: builder => ({
    getUsers: builder.query<User[] | User, void | string>({
      query: userId => `users/${userId}`,
    }),
    getNearUsers: builder.query<User[], string>({
      query: userId => `users/nearby/${userId}`,
    }),
    getFavUsers: builder.query<User[], string>({
      query: userId => `users/fav/${userId}`,
    }),
    getMaterials: builder.query<User[], void>({
      query: () => `materials`,
    }),
    // getMyOrderList: builder.query<User[], string>({
    //   query: userId => `estimates?userId=${userId}`,
    // }),
    getShopOrderList: builder.query<User[], string>({
      query: userId => `estimates?userId=${userId}`,
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
    updateProfilePhoto: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'users/updateProfilePhoto', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
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

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useUpdateUserProfileMutation,
  useUpdateEstimateMutation,
  useGetNearUsersQuery,
  useGetMaterialsQuery,
  useGetFavUsersQuery,
  // useGetMyOrderListQuery,
  useGetShopOrderListQuery,
  useGetEstimateDetQuery,
  useSendEstimateMutation,
  useSetFavUserMutation,
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
  // getMyOrderList,
  getEstimateDet,
  setFavUser,
  sendEstimate,
  updateEstimate,
  addEstimate,
  updateProfilePhoto,
} = IdentityApiSlice.endpoints;
