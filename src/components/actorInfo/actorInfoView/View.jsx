import React from 'react';
import PT from 'prop-types';

import styles from '../ActorInfo.module.scss';

const View = ({ selectedActor, textContent }) => {
  const { name, description, thumbnail } = selectedActor;

  return (
    <>
      <div className={styles.actor__basics}>
        <div>
          <div className={styles.actor__info_name}>{name}</div>

        </div>
        <img className={styles.actor__poster} src={thumbnail} alt={name} />
      </div>
      <div className={styles.actor__descr}>
        <p>{textContent[0]}</p>
        {description}
      </div>

    </>
  );
};

View.propTypes = {
  selectedActor: PT.shape({
    name: PT.string,
    thumbnail: PT.string,
    description: PT.string,
  }),
  textContent: PT.arrayOf(PT.string).isRequired,
};

View.defaultProps = {
  selectedActor: {
    name: '',
    description: '',
    thumbnail: '',
  },
};

export default View;
