import { MaterialsResponseObjectType, User } from 'types';
import { ApiSlice } from './ApiSlice';

export const IdentityApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<User[] | User, void | string>({
      query: userId => `users/${userId}`,
    }),
    getPlaces: builder.query<User[], void | string>({
      query: search => {
        console.log(search, 'Search');
        return `places?query=${search}`;
      },
    }),
    getNearUsers: builder.query<User[], void | string>({
      query: userId => `users/nearby/${userId}`,
    }),
    getFavUsers: builder.query<User[], string>({
      query: userId => `users/fav/${userId}`,
    }),
    getMaterials: builder.query<MaterialsResponseObjectType, void>({
      query: () => `materials`,
      transformResponse: (response: MaterialsResponseObjectType) => {
        let transformedResponse: MaterialsResponseObjectType = {};
        const materialTypes = Object.keys(response);

        //add count and initialCount to each item in material Types.
        materialTypes.forEach((type: string) => {
          transformedResponse[type] = response[type].map(material => {
            const newSizes = material.sizes.map(size => ({
              ...size,
              count: 0,
              initialCount: 0,
            }));

            return { ...material, sizes: newSizes };
          });
        });
        return transformedResponse;
      },
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
    setFavRemove: builder.mutation<User, User>({
      query: function (data) {
        return { url: 'users/fav/remove', method: 'PUT', body: { ...data } };
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
  useSetFavRemoveMutation,
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
  setFavRemove,
} = IdentityApiSlice.endpoints;
