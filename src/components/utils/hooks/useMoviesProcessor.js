import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/movieActions';

const useMoviesProcessor = () => {
  const dispatch = useDispatch();
  const {
    visibleMovieList,
    loadingStatus,
    selectedMovie,
    movieList,
    actor,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (visibleMovieList.length === 0) {
      dispatch(actions.getMovieList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeClick = useCallback(
    (id, coefficientOfLikeChange) => dispatch(actions
      .onChangeLikes({ id, coefficientOfLikeChange })),
    [dispatch],
  );
  const onRatingClick = useCallback(
    (id, rating) => dispatch(actions.onChangeRating({ id, rating })),
    [dispatch],
  );

  const onSubmitEditMovieForm = (movie, changedFields) => {
    dispatch(actions.onUpdateMovie({ ...movie, ...changedFields }));
  };

  const getMovieInfo = (movieId) => {
    dispatch(actions.getMovieInfo(movieId));
  };
  const onMovieInfoLoaded = (movieWithFullInfoInState) => {
    dispatch(onMovieInfoLoaded(movieWithFullInfoInState));
  };
  const onDelete = (deletedId) => {
    dispatch(actions.onDeleteMovie(deletedId));
  };
  const getActorInfo = (actorId) => {
    dispatch(actions.getActorInfo(actorId));
  };
  const getMovieList = () => {
    dispatch(actions.getMovieList());
  };

  const onUpdateSearch = (newTerm) => {
    dispatch(actions.searchMovie(newTerm));
  };

  const onSortMovies = (sortParameter) => {
    dispatch(actions.sortMovies(sortParameter));
  };

  return {
    visibleMovieList,
    loadingStatus,
    selectedMovie,
    movieList,
    actor,
    onLikeClick,
    onRatingClick,
    onSubmitEditMovieForm,
    getMovieInfo,
    getMovieList,
    onMovieInfoLoaded,
    onDelete,
    getActorInfo,
    onUpdateSearch,
    onSortMovies,
  };
};

export default useMoviesProcessor;
