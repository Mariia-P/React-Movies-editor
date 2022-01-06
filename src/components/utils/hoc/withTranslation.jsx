import React, { useContext } from 'react';

import { GeneralContext } from '../context/GeneralContext.context';
import appTextContent from '../../mock/appTextContent';

const withTranslation = (Component) => {
  const componentsTextContent = appTextContent[Component.name];

  const Wrapper = (props) => {
    const { language } = useContext(GeneralContext);
    const textContent = componentsTextContent[language];

    return (
      <Component
        {...props}
        textContent={textContent}

      />
    );
  };

  Wrapper.displayName = `withTranslation(${Component.displayName || Component.name || 'Component'})`;

  return Wrapper;
};

export default withTranslation;
