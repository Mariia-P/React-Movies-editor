/* eslint-disable no-shadow */
import React from 'react';
import PT from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import useMoviesProcessor from '../../utils/hooks/useMoviesProcessor';
import Rating from '../../rating/Rating';
import styles from '../MovieInfo.module.scss';

const View = ({ selectedMovie, textContent }) => {
  const navigate = useNavigate();

  const { onDelete } = useMoviesProcessor();
  const {
    name, description, thumbnail, rating, likes, directorName, actors, id,
  } = selectedMovie;

  const onMainClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const onEditClick = (e) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };

  const actorsButtons = actors.map(({ id, actorName }) => (
    <Link
      to={`/actor/${id}`}
      className={styles.movie__actor_link}
      key={id}
    >
      {actorName}
    </Link>
  ));

  return (
    <>
      <div className={styles.movie__basics}>
        <div>
          <div className={styles.movie__info_name}>{name}</div>
          <div className={styles.movie__like}>
            {textContent[0]}
            {likes}
          </div>
          <Rating rating={rating} />
          <div className={styles.movie__button_wrapper}>
            <button
              className="button button__main"
              type="button"
              onClick={(e) => { onDelete(id); onMainClick(e); }}
            >
              <div className="inner">{textContent[1]}</div>
            </button>
            <button
              className="button button__secondary"
              type="button"
              onClick={(e) => { onEditClick(e); }}
            >
              <div className="inner">{textContent[2]}</div>
            </button>
          </div>

        </div>
        <img className={styles.movie__poster} src={thumbnail} alt={name} />
      </div>
      <div className={styles.movie__descr}>
        <p>{textContent[3]}</p>
        {directorName}
      </div>
      <div className={styles.movie__descr}>
        <p>{textContent[4]}</p>
        {actorsButtons}
      </div>
      <div className={styles.movie__descr}>
        <p>{textContent[5]}</p>
        {description}
      </div>

    </>
  );
};

View.propTypes = {
  selectedMovie: PT.shape({
    id: PT.oneOfType([
      PT.string,
      PT.number,
    ]),
    name: PT.string,
    actors: PT.arrayOf(PT.shape({
      id: PT.number,
      actorName: PT.string,
    })),
    directorName: PT.string,
    rating: PT.number,
    likes: PT.number,
    thumbnail: PT.string,
    description: PT.string,
  }),
  textContent: PT.arrayOf(PT.string).isRequired,
};

View.defaultProps = {
  selectedMovie: {
    id: null,
    name: '',
    description: '',
    thumbnail: '',
    directorName: '',
    likes: 0,
    rating: 0,
    actors: [],
  },
};

export default View;
