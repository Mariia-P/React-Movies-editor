import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import App from './App';

const renderWithStore = (
  component,
) => ({
  ...render(

    <Provider store={store}>
      {component}
    </Provider>,

  ),
});

test('App component renders correctly', () => {
  const component = renderWithStore(
    <App />,
    store,
  );
  expect(component).toMatchSnapshot();
});
