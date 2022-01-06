import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import MovieInfo from './MovieInfo';
import store from '../../store/store';

jest.mock('react-router-dom', () => ({
  useParams: () => jest.fn().mockReturnValue({ movieId: 50 }),
  useNavigate: () => jest.fn(),
}));

describe('MovieInfo', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithStore = (
    component,
  ) => ({
    ...render(

      <Provider store={store}>
        {component}
      </Provider>,

    ),
  });

  const textContent = [
    'Likes:',
    'Delete',
    'Edit',
    'Director:',
    'Actors:',
    'Description:',
  ];

  it('should match snapshot', () => {
    const component = renderWithStore(
      <MovieInfo
        textContent={textContent}
      />,
      store,
    );

    expect(component).toMatchSnapshot();
  });
});
