import React, { useContext } from 'react';
import PT from 'prop-types';
import cnBind from 'classnames/bind';

import { GeneralContext } from '../utils/context/GeneralContext.context';
import styles from './AppHeader.module.scss';

const cx = cnBind.bind(styles);

const AppHeader = ({ textContent }) => {
  const { changeData, language } = useContext(GeneralContext);

  const changeLanguage = (currentLanguage) => {
    changeData((oldContextValue) => ({
      ...oldContextValue,
      language: currentLanguage,
    }));
  };

  const buttonsData = [
    { name: 'russian', label: 'RU' },
    { name: 'english', label: 'EN' },
  ];

  const buttons = buttonsData.map(({ name, label }) => (
    <button
      className={cx({
        button__language: true,
        active: !!(name === language),
      })}
      type="button"
      key={name}
      onClick={() => {
        changeLanguage(name);
      }}
    >
      {label}
    </button>
  ));

  return (
    <header className={styles.app__header}>
      <div className={styles.app__title_wrapper}>
        <h1 className={styles.app__title}>
          {textContent[0]}
        </h1>
      </div>

      <div className={styles.panel__language_wrapper}>{buttons}</div>
    </header>
  );
};

AppHeader.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

AppHeader.defaultProps = {
  textContent: ['MOVIES'],
};

export default AppHeader;
