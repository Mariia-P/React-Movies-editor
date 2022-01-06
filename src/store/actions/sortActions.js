import * as types from '../types';

const sortMovies = (sortType) => ({
  type: types.SORT_MOVIES,
  payload: {
    sortType,
  },
});

export default sortMovies;
