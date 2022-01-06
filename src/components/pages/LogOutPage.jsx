import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/actions/authActions';

const LogOutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);
  return null;
};

export default LogOutPage;
