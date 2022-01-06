import * as types from '../types';

const onChangeRating = (selectedId, newRating) => ({
  type: types.CHANGE_RATING,
  payload: {
    selectedId,
    newRating,
  },
});

export default onChangeRating;
