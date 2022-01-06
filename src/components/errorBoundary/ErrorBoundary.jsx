import React, { Component } from 'react';
import PT from 'prop-types';
import ErrorMessage from '../errorMessage/ErrorMessage';

// import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <ErrorMessage />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PT.element.isRequired,
};

export default ErrorBoundary;
