import React from 'react';
import PT from 'prop-types';

import { v4 as uuidv4 } from 'uuid';
import emptyStar from '../../resources/Star-2.svg';
import fullStar from '../../resources/Star-1.svg';

import styles from './Rating.module.scss';

const Rating = ({ rating, onChangeRating, id }) => {
  const maxCountOfStars = 5;

  return (
    <div className={styles.rating__wrapper}>
      {[...Array(maxCountOfStars)].map((el, i) => {
        const currentStar = i < rating ? fullStar : emptyStar;
        const disabled = !(id && onChangeRating);
        return (
          <button
            key={uuidv4()}
            className={`${styles.rating__button} ${styles.rating__button_full}`}
            type="button"
            data-i={i + 1}
            onClick={() => {
              onChangeRating(id, i + 1);
            }}
            disabled={disabled}
          >
            <img src={currentStar} alt="star" />
          </button>
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  rating: PT.number.isRequired,
  id: PT.oneOfType([
    PT.string,
    PT.number,
  ]),
  onChangeRating: PT.func,
};

Rating.defaultProps = {
  id: null,
  onChangeRating: null,
};
export default Rating;
