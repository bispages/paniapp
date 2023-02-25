import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../types';
import { saveUser } from '../store/slices/AppStateSlice';

// Hook checks for login.
const useIsLoggedIn = () => {
  const dispatchAction = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      let user: User | null = null;
      if (value !== null) {
        user = JSON.parse(value);
        if (user) dispatchAction(saveUser(user));
      }
      setTimeout(() => {
        setUser(user);
        setLoading(false);
      }, 1000);
    });
  }, []);

  return { loading, user };
};

export default useIsLoggedIn;
