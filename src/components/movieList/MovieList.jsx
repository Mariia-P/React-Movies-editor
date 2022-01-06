import React from 'react';
import { Link } from 'react-router-dom';

import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Likes from '../likes/Likes';
import Rating from '../rating/Rating';

import styles from './MovieList.module.scss';

const MovieList = () => {
  const {
    visibleMovieList, loadingStatus, onLikeClick, onRatingClick,
  } = useMoviesProcessor();

  function renderMoviesCards(movies) {
    if (!movies.length) return null;
    const moviesCards = movies.map((el, i) => {
      const {
        name, thumbnail, id, rating, likes,
      } = el;

      return (
        <li
          key={id}
          data-i={i}
          className={styles.movie__item}
        >
          <div className={styles.movie__button_wrapper}>
            <Link
              to={`/movieInfo/${id}`}
              className={styles.movie__name}
            >
              {name}
            </Link>

          </div>
          <div className={styles.movie__center}>
            <Likes
              likes={likes}
              onChangeLikes={onLikeClick}
              id={id}
            />
            <img className={styles.movie__banner} src={thumbnail} alt="imageOfMovie" />

          </div>
          <Rating
            rating={rating}
            onChangeRating={onRatingClick}
            id={id}
          />
        </li>
      );
    });

    return <ul className={styles.movie__grid}>{moviesCards}</ul>;
  }

  const moviesContent = renderMoviesCards(visibleMovieList);

  const errorMessage = loadingStatus === 'error' ? <ErrorMessage /> : null;
  const spinner = loadingStatus === 'loading' ? <Spinner /> : null;
  const content = !(errorMessage || spinner) ? moviesContent : null;

  return (
    <div className={styles.movie__list}>
      {spinner}
      {errorMessage}
      {content}
    </div>
  );
};

export default MovieList;
