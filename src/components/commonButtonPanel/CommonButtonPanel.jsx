import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import PT from 'prop-types';
// import { GeneralContext } from '../utils/context/GeneralContext.context';

import styles from './CommonButtonPanel.module.scss';

const CommonButtonPanel = ({ textContent }) => (
  <>
    <div className={styles.panel__wrapper}>
      <Link
        className="button button__secondary"
        to="/logout"
      >
        <div className="inner">{textContent[0]}</div>
      </Link>

    </div>
    <Outlet />
  </>
);
CommonButtonPanel.propTypes = {
  textContent: PT.arrayOf(PT.string),
};

CommonButtonPanel.defaultProps = {
  textContent: ['Log out'],
};

export default CommonButtonPanel;
