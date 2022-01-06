import React from 'react';

import styles from './Skeleton.module.scss';

const Skeleton = () => (
  <>
    <p className={styles.char__select}>
      Please select a movie to see information
    </p>
    <div className={styles.skeleton}>
      <div className={`${styles.pulse} ${styles.skeleton__header}`}>
        <div className={`${styles.pulse} ${styles.skeleton__circle}`} />
        <div className={`${styles.pulse} ${styles.skeleton__mini}`} />
      </div>
      <div className={`${styles.pulse} ${styles.skeleton__block}`} />
      <div className={`${styles.pulse} ${styles.skeleton__block}`} />
      <div className={`${styles.pulse} ${styles.skeleton__block}`} />
    </div>
  </>
);

export default Skeleton;
