import * as types from '../types';

export const onMovieListLoaded = (newMovieList) => ({
  type: types.MOVIE_LIST_LOADED,
  payload: {
    newMovieList,
  },
});

export const onMovieListLoading = () => ({
  type: types.MOVIE_LIST_LOADING,
});

export const moviesLoadError = () => ({
  type: types.MOVIE_LIST_LOAD_ERROR,
});
