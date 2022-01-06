import reducer, { changeLikes, deleteMovie } from './movieListReducer';
import { getMovieList } from '../actions/movieActions';

const moviePayload = [
  {
    adult: false,
    backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
    id: 634649,
    original_title: 'Spider-Man: No Way Home',
    likes: 7,
  },
  {
    adult: false,
    backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
    id: 624860,
    original_title: 'The Matrix Resurrections',
    likes: 2,
  },
];

describe('Movies slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      movieList: [],
      selectedMovie: null,
      loadingStatus: false,
      searchQwery: '',
      sort: 'reset',
      visibleMovieList: [],
      actor: '',
    });
  });

  it('should handle correct state for pending status of movie list getting', () => {
    const initialState = {
      movieList: [],
      loadingStatus: false,
    };
    const action = { type: getMovieList.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      movieList: [],
      loadingStatus: 'loading',
    });
  });
  it('should handle a chenging like in the movie list', () => {
    const previousState = {
      movieList: moviePayload,
      visibleMovieList: moviePayload,
      loadingStatus: false,
    };
    const likePayload = {
      id: 634649,
      coefficientOfLikeChange: 1,
    };

    expect(reducer(previousState, changeLikes(likePayload))).toEqual({
      movieList: [
        {
          adult: false,
          backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
          id: 634649,
          original_title: 'Spider-Man: No Way Home',
          likes: 8,
        },
        {
          adult: false,
          backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
          id: 624860,
          original_title: 'The Matrix Resurrections',
          likes: 2,
        },
      ],
      visibleMovieList: [
        {
          adult: false,
          backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
          id: 634649,
          original_title: 'Spider-Man: No Way Home',
          likes: 8,
        },
        {
          adult: false,
          backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
          id: 624860,
          original_title: 'The Matrix Resurrections',
          likes: 2,
        },
      ],
      loadingStatus: false,
    });
  });

  it('should handle a movie being deleted from movie list', () => {
    const previousState = {
      movieList: moviePayload,
      visibleMovieList: moviePayload,
      loadingStatus: false,
      selectedMovie: '634649',
    };

    const result = reducer(previousState, deleteMovie('634649'));
    expect(result).toEqual({
      movieList: [
        {
          adult: false,
          backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
          id: 624860,
          original_title: 'The Matrix Resurrections',
          likes: 2,
        },
      ],
      visibleMovieList: [
        {
          adult: false,
          backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
          id: 624860,
          original_title: 'The Matrix Resurrections',
          likes: 2,
        },
      ],
      loadingStatus: false,
      selectedMovie: null,
    });
  });

  it('should handle correct state for rejected status of movie list getting', () => {
    const initialState = {
      movieList: [],
      loadingStatus: false,
    };
    const action = { type: getMovieList.rejected.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      movieList: [],
      loadingStatus: 'error',
    });
  });

  it('should handle correct state for fulfilled status of movie list getting', () => {
    const initialState = {
      movieList: [],
      loadingStatus: false,
      visibleMovieList: [],
    };

    const action = {
      type: getMovieList.fulfilled.type,
      payload: moviePayload,
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      movieList: moviePayload,
      loadingStatus: false,
      visibleMovieList: moviePayload,
    });
  });
});
