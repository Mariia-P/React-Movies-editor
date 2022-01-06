/* eslint-disable react/prop-types */
import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import useMoviesProcessor from './useMoviesProcessor';
import configureStore from '../../../store/store';

const movies = ['test', 'test'];
const actors = ['actor1', 'actor2'];

jest.mock('../../../services/MovieService', () => jest.fn()
  .mockImplementation(() => ({
    getMovies: () => movies,
    getActorDetails: () => actors,
  })));

describe('useMoviesProcessor', () => {
  const wrapper = ({ children, reduxStore }) => (
    <Provider store={reduxStore}>{children}</Provider>
  );

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('Default visible movie list list should be empty array', () => {
    const { result } = renderHook(() => useMoviesProcessor(), {
      wrapper,
      initialProps: {
        reduxStore: configureStore,
      },
    });

    expect(result.current.visibleMovieList.length).toBe(0);
  });

  it('should update  movie list after calling getMovieList', async () => {
    const { result } = renderHook(() => useMoviesProcessor(), {
      wrapper,
      initialProps: {
        reduxStore: configureStore,
      },
    });

    await act(async () => {
      await result.current.getMovieList();
    });
    expect(result.current.visibleMovieList).toEqual(movies);
  });
  it('should update  actor after calling getActorInfo', async () => {
    const { result } = renderHook(() => useMoviesProcessor(), {
      wrapper,
      initialProps: {
        reduxStore: configureStore,
      },
    });
    await act(async () => {
      await result.current.getActorInfo('5');
    });
    expect(result.current.actor).toEqual(actors);
  });
});
