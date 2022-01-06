import React from 'react';
import PT from 'prop-types';

import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';
import styles from './SortPanel.module.scss';
import '../../style/button.scss';

const SortPanel = ({ textContent }) => {
  const { onSortMovies } = useMoviesProcessor();

  const buttonsData = [
    { name: 'likes', label: textContent[0] },
    { name: 'rating', label: textContent[1] },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const clazz = name === 'reset' ? 'button__secondary' : 'button__main';
    return (
      <button
        className={`button ${clazz}`}
        type="button"
        key={name}
        onClick={() => { onSortMovies(name); }}
      >
        <div className="inner">{label}</div>
      </button>
    );
  });

  return (
    <div className={styles.sort__wrapper}>
      <h2>{textContent[2]}</h2>
      <div className={styles.sort__button_group}>{buttons}</div>
    </div>
  );
};

SortPanel.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

SortPanel.defaultProps = {
  textContent: ['MOVIES'],
};

export default SortPanel;
