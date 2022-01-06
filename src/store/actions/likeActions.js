import * as types from '../types';

const onChangeLikes = (selectedId, coefficientOfLikeChange) => ({
  type: types.LIKED_MOVIE,
  payload: {
    selectedId,
    coefficientOfLikeChange,
  },
});

export default onChangeLikes;
