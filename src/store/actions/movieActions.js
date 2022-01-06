import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import MovieService from '../../services/MovieService';

export const onMovieInfoLoaded = createAction('movies/movieInfoLoaded');

export const onChangeLikes = createAction('movies/changeLikes');
export const onDeleteMovie = createAction('movies/deleteMovie');
export const onChangeRating = createAction('movies/changeRating');
export const searchMovie = createAction('movies/changeSearch');
export const sortMovies = createAction('movies/sortMovies');
export const onUpdateMovie = createAction('movies/updateMovie');

const movieFetching = new MovieService();

export const getMovieList = createAsyncThunk('movies/getMovieList', async () => {
  const response = await movieFetching.getMovies();
  return response;
});

export const getMovieInfo = createAsyncThunk(
  'movies/getMovieInfo',
  async (movieId) => {
    const response = await movieFetching.getMovieDetails(movieId);
    return response;
  },
);

export const getActorInfo = createAsyncThunk(
  'movies/getActorInfo',
  async (actorId) => {
    const response = await movieFetching.getActorDetails(actorId);
    return response;
  },
);
