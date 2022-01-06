import React from 'react';

import MovieInfo from '../movieInfo/MovieInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import withTranslation from '../utils/hoc/withTranslation';

const MovieInfoPage = () => {
  const MovieInfoWithTranslation = withTranslation(MovieInfo);

  return (
    <ErrorBoundary>
      <MovieInfoWithTranslation />
    </ErrorBoundary>
  );
};

export default MovieInfoPage;
