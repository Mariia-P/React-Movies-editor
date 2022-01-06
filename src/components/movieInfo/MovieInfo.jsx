import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PT from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import View from './movieInfoView/View';
import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';
import styles from './MovieInfo.module.scss';

const MovieInfo = ({ textContent }) => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const {
    movieList, selectedMovie, loadingStatus, getMovieInfo, onMovieInfoLoaded,
  } = useMoviesProcessor();

  const movieWithFullInfoInState = movieList.find((movie) => +movie.id === +movieId
  && Object.prototype.hasOwnProperty.call(movie, 'directorName'));

  useEffect(() => {
    if (movieList.length === 0 || !movieId) {
      navigate('/error');
    }
    if (!movieWithFullInfoInState) {
      getMovieInfo(movieId);
    } else {
      onMovieInfoLoaded(movieWithFullInfoInState);
    }
  }, [movieId]);

  const errorMessage = loadingStatus === 'error' ? <ErrorMessage /> : null;
  const spinner = loadingStatus === 'loading' ? <Spinner /> : null;
  const content = !(errorMessage || spinner || !selectedMovie)
    ? <View selectedMovie={selectedMovie} textContent={textContent} /> : null;

  return (
    <div className={styles.movie__info}>
      {errorMessage}
      {spinner}
      {content}

    </div>
  );
};

MovieInfo.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

MovieInfo.defaultProps = {
  textContent: [
    'Likes:',
    'Delete',
    'Edit',
    'Director:',
    'Actors:',
    'Description:',
  ],
};

export default MovieInfo;
