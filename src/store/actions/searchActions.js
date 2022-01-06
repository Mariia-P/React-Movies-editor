import * as types from '../types';

const searchMovie = (criterion) => ({
  type: types.CHANGE_SEARCH,
  payload: {
    criterion,
  },
});
export default searchMovie;
