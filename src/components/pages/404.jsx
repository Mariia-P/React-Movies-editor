import React from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
  const styledP = {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };
  const styledLink = {
    display: 'block',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  };
  return (
    <div>
      <ErrorMessage />
      <p style={styledP}>Page does not exist</p>
      <Link style={styledLink} to="/">
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
