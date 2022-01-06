import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import View from './View';
import store from '../../../store/store';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Route: ({ children, path }) => children({ match: path === '/somewhere' }),
}));

describe('View for EditInfo', () => {
  const renderWithStore = (component) => ({
    ...render(<Provider store={store}>{component}</Provider>),
  });

  const textContent = [
    'Title',
    'Img URL',
    'Director',
    'Description',
    'Submit',
    'Go back',
  ];

  it('should match snapshot', () => {
    const component = renderWithStore(
      <View textContent={textContent} />,
      store,
    );

    expect(component).toMatchSnapshot();
  });
});
