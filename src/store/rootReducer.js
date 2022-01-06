import { combineReducers } from 'redux';
import movieListReducer from './reducers/movieListReducer';

export default combineReducers({
  movies: movieListReducer,
});
