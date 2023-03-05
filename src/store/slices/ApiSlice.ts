import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_BASE_URL } from '../../utils/constants';

/**
 * @description - API Slice of the global store "paniappApiStates".
 */
export const ApiSlice = createApi({
  //The name of the rootstate.
  reducerPath: 'paniappApiStates',
  tagTypes: ['User'],
  //Setting the url. If we need another base url then create another ApiSlice with createApi with different reducerPath.
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async headers => {
      headers.set('Content-Type', 'application/json');
      try {
        if (!headers.has('Authorization')) {
          headers.set(
            'Authorization',
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUGhvbmUiOjk5NDc3NjU3ODgsInVzZXJJZCI6ImI2NzdhZTAwLTkwODgtNDBiMi04MDY0LWU1NjJhNGY2NTUxYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY3NzQwOTc2M30.YqZ5rjeHmB6q0xN1-q4QlHrhZdd4sKDaMlCv0kULBvE',
          );
        }
      } catch (error) {}

      return headers;
    },
  }),
  //Authorization:
  //endpoints is code splitted and will be injected at later point of time.
  endpoints: () => ({}),
});
