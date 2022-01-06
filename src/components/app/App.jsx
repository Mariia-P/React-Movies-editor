import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import AppFooter from '../appFooter/AppFooter';

import { GeneralContext, generalInfo } from '../utils/context/GeneralContext.context';
import AppPrivatRoutes from '../appPrivatRoutes/AppPrivateRoutes';
import withTranslation from '../utils/hoc/withTranslation';

const App = () => {
  const [generalContextValue, setContextValue] = useState(generalInfo);
  const AppHeaderWithTranslation = withTranslation(AppHeader);

  const providedValue = useMemo(() => ({
    ...generalContextValue,
    changeData: setContextValue,
  }), [generalContextValue]);

  return (

    <Router>
      <GeneralContext.Provider value={providedValue}>
        <div className="app">
          <AppHeaderWithTranslation />
          <AppPrivatRoutes />
          <AppFooter />
        </div>
      </GeneralContext.Provider>
    </Router>
  );
};

export default App;
