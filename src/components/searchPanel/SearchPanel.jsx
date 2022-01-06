import React, { useState } from 'react';
import PT from 'prop-types';
import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';

import styles from './SearchPanel.module.scss';

import icon from '../../resources/a-icon-search-3.svg';

const SearchPanel = ({ textContent }) => {
  const { onUpdateSearch } = useMoviesProcessor();

  const [term, setTerm] = useState('');

  const handleSearch = (e) => {
    const newTerm = e.target.value.trim();
    setTerm(newTerm);
    onUpdateSearch(newTerm);
  };

  return (
    <div className={styles.search__wrapper}>
      <button type="button" className={styles.search__button}>
        <img className={styles.search__icon} src={icon} alt="search movie" />
      </button>
      <input
        type="text"
        className={styles.search__input}
        placeholder={textContent[0]}
        value={term}
        onChange={handleSearch}
      />
    </div>
  );
};

SearchPanel.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

SearchPanel.defaultProps = {
  textContent: ['Find a movie'],
};

export default SearchPanel;
