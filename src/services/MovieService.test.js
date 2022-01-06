import MovieService from './MovieService';

describe('Movie Service Test Suite', () => {
  const list = [
    {
      adult: false,
      backdrop_path: '/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
      genre_ids: [28, 12, 878],
      id: 634649,
      original_language: 'en',
      original_title: 'Spider-Man: No Way Home',
      overview:
        'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
      popularity: 10039.54,
      poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      release_date: '2021-12-15',
      title: 'Spider-Man: No Way Home',
      video: false,
      vote_average: 8.4,
      vote_count: 3160,
    },
    {
      adult: false,
      backdrop_path: '/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
      genre_ids: [28, 878],
      id: 624860,
      original_language: 'en',
      original_title: 'The Matrix Resurrections',
      overview:
        "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
      popularity: 8255.101,
      poster_path: '/8c4a8kE7PizaGQQnditMmI1xbRp.jpg',
      release_date: '2021-12-16',
      title: 'The Matrix Resurrections',
      video: false,
      vote_average: 7.2,
      vote_count: 1403,
    },
  ];
  const transformedMovies = [
    {
      id: 634649,
      thumbnail:
        'https://image.tmdb.org/t/p/w500/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
      name: 'Spider-Man: No Way Home'.slice(0, 25).toLowerCase(),
      rating: 4,
      likes: 17,
    },
    {
      id: 624860,
      thumbnail:
        'https://image.tmdb.org/t/p/w500/hv7o3VgfsairBoQFAawgaQ4cR1m.jpg',
      name: 'The Matrix Resurrections'.slice(0, 25).toLowerCase(),
      rating: 4,
      likes: 14,
    },
  ];
  const movieService = new MovieService();
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: 'ok',
      json: jest.fn().mockResolvedValue(list),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should respond with correct data', async () => {
    const data = await movieService.getResource('https://');

    expect(data).toEqual(list);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should transform movie in correct format', () => {
    const movie = movieService.transformMovie(list[0]);
    expect(movie).toEqual(transformedMovies[0]);
  });

  it('should return movie list in correct format', async () => {
    const spy = jest
      .spyOn(movieService, 'getResource')
      .mockImplementation(() => ({ results: list }));

    const data = await movieService.getMovies();
    expect(data).toEqual(transformedMovies);

    spy.mockRestore();
  });
});
