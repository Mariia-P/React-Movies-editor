import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PT from 'prop-types';

import useMoviesProcessor from '../utils/hooks/useMoviesProcessor';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import View from './actorInfoView/View';

import styles from './ActorInfo.module.scss';

const ActorInfo = ({ textContent }) => {
  const { actorId } = useParams();

  const { actor, loadingStatus, getActorInfo } = useMoviesProcessor();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actorId) {
      navigate('/error');
    }
    getActorInfo(actorId);
  }, [actorId]);

  const errorMessage = loadingStatus === 'error' ? <ErrorMessage /> : null;
  const spinner = loadingStatus === 'loading' ? <Spinner /> : null;
  const content = !(errorMessage || spinner || !actor)
    ? <View selectedActor={actor} textContent={textContent} /> : null;

  return (
    <div className={styles.actor__info}>
      {errorMessage}
      {spinner}
      {content}

    </div>
  );
};

ActorInfo.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

ActorInfo.defaultProps = {
  textContent: ['Description:'],
};

export default ActorInfo;
