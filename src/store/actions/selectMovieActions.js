import * as types from '../types';

const selectMovie = (selectedId) => ({
  type: types.SELECT_MOVIE,
  payload: {
    selectedId,
  },
});

export default selectMovie;
