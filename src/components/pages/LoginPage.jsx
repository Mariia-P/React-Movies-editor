import React from 'react';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import LoginUser from '../loginUser/LoginUser';
import withTranslation from '../utils/hoc/withTranslation';

const LoginPage = () => {
  const LoginUserWithTranslation = withTranslation(LoginUser);
  return (
    <ErrorBoundary>
      <LoginUserWithTranslation />
    </ErrorBoundary>

  );
};

export default LoginPage;
