import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import EditMovie from './EditMovie';
import store from '../../store/store';

jest.mock('react-router-dom', () => ({
  useParams: () => jest.fn().mockReturnValue({ movieId: 50 })(),
  useNavigate: () => jest.fn(),
  Navigate: () => 'navigate',
}));

jest.mock('../utils/hooks/useMoviesProcessor', () => ({
  __esModule: true,
  default: () => ({ selectedMovie: { id: 50 } }),
}));

jest.mock('./editMovieView/View', () => () => {
  const View = 'component-mock';
  return <View />;
});

describe('EditMovie', () => {
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
    'Title',
    'Img URL',
    'Director',
    'Description',
    'Submit',
    'Go back',
  ];

  it('should match snapshot', () => {
    const component = renderWithStore(
      <EditMovie
        textContent={textContent}
      />,
      store,
    );

    expect(component).toMatchSnapshot();
  });
});
