import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import View from './View';
import store from '../../../store/store';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  Link: 'a',
  Route: ({ children, path }) => children({ match: path === '/somewhere' }),
}));

describe('View for MovieInfo', () => {
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

  const selectedMovie = {
    id: 25,
    name: 'test',
    description: 'test',
    thumbnail: '',
    directorName: 'test',
    likes: 5,
    rating: 5,
    actors: [{ id: 1, actorName: 'test' }, { id: 2, actorName: 'test' }, {
      id: 3,
      name: 'test',
    }],
  };

  it('should match snapshot', () => {
    const component = renderWithStore(
      <View
        selectedMovie={selectedMovie}
        textContent={textContent}
      />,
      store,
    );

    expect(component).toMatchSnapshot();
  });
});
