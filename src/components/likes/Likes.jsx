import React from 'react';
import PT from 'prop-types';

import likeIcon from '../../resources/a-icon-like-1.svg';

import styles from './Likes.module.scss';

const Likes = ({ likes, onChangeLikes, id }) => (
  <div className={styles.like__wrapper}>
    <button
      className={styles.like__button}
      type="button"
      onClick={() => {
        onChangeLikes(id, 1);
      }}
    >
      <img src={likeIcon} alt="like" />
    </button>
    <button
      className={styles.like__button}
      type="button"
      onClick={() => {
        onChangeLikes(id, -1);
      }}
    >
      <img src={likeIcon} className={styles.like__dislike} alt="dislike" />
    </button>

    <h3>likes</h3>
    <div>{likes}</div>
  </div>
);

Likes.propTypes = {
  likes: PT.number,
  onChangeLikes: PT.func,
  id: PT.oneOfType([
    PT.string,
    PT.number,
  ]),
};

Likes.defaultProps = {
  likes: null,
  onChangeLikes: null,
  id: null,
};
export default Likes;
