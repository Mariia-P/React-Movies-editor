/* eslint no-param-reassign: 0 */
import { createSlice } from '@reduxjs/toolkit';
import {
  getMovieList,
  getMovieInfo,
  getActorInfo,
} from '../actions/movieActions';

const initialState = {
  movieList: [],
  selectedMovie: null,
  loadingStatus: false,
  searchQwery: '',
  sort: 'reset',
  visibleMovieList: [],
  actor: '',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {

    changeRating: (state, { payload }) => {
      state.movieList = state.movieList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, rating: payload.rating };
        }
        return item;
      });
      state.visibleMovieList = state.visibleMovieList.map((item) => {
        if (item.id === payload.id) {
          return { ...item, rating: payload.rating };
        }
        return item;
      });
    },

    changeLikes: (state, { payload }) => {
      state.movieList = state.movieList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            likes: item.likes + payload.coefficientOfLikeChange,
          };
        }
        return item;
      });
      state.visibleMovieList = state.visibleMovieList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            likes: item.likes + payload.coefficientOfLikeChange,
          };
        }
        return item;
      });
    },

    deleteMovie: (state, { payload }) => {
      state.movieList = state.movieList.filter((el) => +el.id !== +payload);
      state.visibleMovieList = state.movieList.filter((el) => +el.id !== +payload);
      state.selectedMovie = null;
    },

    movieInfoLoaded: (state, { payload }) => {
      const prevMovie = state.movieList.filter(
        ({ id }) => +id === +payload.id,
      );
      state.selectedMovie = {
        ...payload,
        likes: prevMovie[0].likes,
        rating: prevMovie[0].rating,
      };
      state.loadingStatus = false;
    },

    updateMovie: (state, { payload }) => {
      state.visibleMovieList = state.visibleMovieList.map((item) => {
        if (+item.id === +payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      state.movieList = state.movieList.map((item) => {
        if (+item.id === +payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      state.selectedMovie = {
        ...state.selectedMovie,
        ...payload.movieInfo,
      };
    },

    sortMovies: (state, { payload }) => {
      state.sort = payload;
      state.visibleMovieList = payload === 'reset'
        ? state.movieList
        : state.visibleMovieList.sort((a, b) => {
          if (a[payload] > b[payload]) {
            return -1;
          }
          return 1;
        });
    },

    changeSearch: (state, { payload }) => {
      state.searchQwery = payload;
      state.visibleMovieList = payload.length === 0
        ? state.movieList
        : state.visibleMovieList
          .filter(({ name }) => name.includes(payload));
    },

  },

  extraReducers: {
    [getMovieList.pending]: (state) => {
      state.loadingStatus = 'loading';
    },
    [getMovieList.fulfilled]: (state, { payload }) => {
      state.loadingStatus = false;
      state.movieList = payload;
      state.visibleMovieList = state.sort === 'reset'
        ? payload
        : payload.sort((a, b) => {
          if (a[state.sort] > b[state.sort]) {
            return -1;
          }
          return 1;
        });
    },
    [getMovieList.rejected]: (state) => {
      state.loadingStatus = 'error';
    },

    [getMovieInfo.pending]: (state) => {
      state.loadingStatus = 'loading';
    },
    [getMovieInfo.fulfilled]: (state, { payload }) => {
      const prevMovie = state.movieList.filter(({ id }) => +id === +payload.id);
      state.selectedMovie = {
        ...payload,
        likes: prevMovie[0].likes,
        rating: prevMovie[0].rating,
      };
      state.loadingStatus = false;
    },
    [getMovieInfo.rejected]: (state) => {
      state.loadingStatus = 'error';
    },

    [getActorInfo.pending]: (state) => {
      state.loadingStatus = 'loading';
    },
    [getActorInfo.fulfilled]: (state, { payload }) => {
      state.actor = payload;
      state.loadingStatus = false;
    },
    [getActorInfo.rejected]: (state) => {
      state.loadingStatus = 'error';
    },
  },
});

export const { changeLikes, deleteMovie } = movieSlice.actions;

export default movieSlice.reducer;
