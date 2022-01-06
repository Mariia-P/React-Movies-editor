import React from 'react';

import EditMovie from '../editMovie/EditMovie';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import withTranslation from '../utils/hoc/withTranslation';

const EditMoviePage = () => {
  const EditMovieWithTranslation = withTranslation(EditMovie);

  return (
    <ErrorBoundary>
      <EditMovieWithTranslation />
    </ErrorBoundary>
  );
};

export default EditMoviePage;
