import React from 'react';

import MovieList from '../movieList/MovieList';
import SortPanel from '../sortPanel/SortPanel';
import SearchPanel from '../searchPanel/SearchPanel';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import withTranslation from '../utils/hoc/withTranslation';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const SearchPanelWithTranslation = withTranslation(SearchPanel);
  const SortPanelWithTranslation = withTranslation(SortPanel);

  return (
    <main className="main__wrapper">
      <div className={styles.movie__left_wrapper}>
        <div className="movie__operations-panel">
          <SortPanelWithTranslation />
          <SearchPanelWithTranslation />
        </div>
        <ErrorBoundary>
          <MovieList />
        </ErrorBoundary>

      </div>
    </main>
  );
};

export default MainPage;
