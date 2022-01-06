import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PT from 'prop-types';

import View from './editMovieView/View';
import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';
import styles from './EditMovie.module.scss';

const EditMovie = ({ textContent }) => {
  const { movieId } = useParams();

  const { selectedMovie } = useMoviesProcessor();

  const content = +selectedMovie.id === +movieId ? <View movie={selectedMovie} textContent={textContent} /> : <Navigate replace to="/error" />;

  return (
    <div className={styles.edit}>
      {content}
    </div>
  );
};

EditMovie.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

EditMovie.defaultProps = {
  textContent: [
    'Title',
    'Img URL',
    'Director',
    'Description',
    'Submit',
    'Go back',
  ],
};

export default EditMovie;
