import { User } from 'types';
import { ApiSlice } from './ApiSlice';

export const LoginApiSlice = ApiSlice.injectEndpoints({
  endpoints: builder => ({
    otpLogin: builder.mutation<User, { userPhone: string }>({
      query: function (data) {
        return { url: 'login/otp', method: 'POST', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
    otpVerify: builder.mutation<
      { accessToken: string; userPhone: string; userId: string },
      { userPhone: string; sessionId: string; otp: string }
    >({
      query: function (data) {
        return { url: 'login/verify', method: 'PUT', body: { ...data } };
      },
      invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: true,
});

export const { useOtpLoginMutation, useOtpVerifyMutation } = LoginApiSlice;
export const { otpLogin, otpVerify } = LoginApiSlice.endpoints;
