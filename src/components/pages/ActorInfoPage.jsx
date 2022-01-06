import React from 'react';

import ActorInfo from '../actorInfo/ActorInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import withTranslation from '../utils/hoc/withTranslation';

const ActorInfoPage = () => {
  const ActorInfoWithTranslation = withTranslation(ActorInfo);

  return (
    <ErrorBoundary>
      <ActorInfoWithTranslation />
    </ErrorBoundary>
  );
};

export default ActorInfoPage;
