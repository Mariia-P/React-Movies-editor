import React from 'react';

import RegisterUser from '../registerUser/RegisterUser';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import withTranslation from '../utils/hoc/withTranslation';

const RegisteredPage = () => {
  const RegisterUserWithTranslation = withTranslation(RegisterUser);
  return (
    <ErrorBoundary>
      <RegisterUserWithTranslation />
    </ErrorBoundary>
  );
};

export default RegisteredPage;
