// fetchData.ts

import { useDispatch } from 'react-redux';
import { useFetchDataQuery } from './slices/IdentityApiSlice';

const useDataFetch = () => {
  const dispatch = useDispatch();

  // Fetch data when the component mounts or whenever necessary
  dispatch(useFetchDataQuery());
};

export default useDataFetch;
