/* eslint-disable no-shadow */
import notFound from '../resources/notFound.png';

const {
  REACT_APP_MOVIEDB_API_KEY,
  REACT_APP_MOVIEDB_URL,
  REACT_APP_STORAGE_URL,
} = process.env;

class MovieService {
  MAX_TITLE_LENGTH = 25;

  MAX_DESCRIPTION_LENGTH = 500;

  RATING_AND_LIKES_ADAPTATION_KOEF = 2;

  MAX_FILMS_ON_PAGE = 9;

  MAX_ACTORS_ON_PAGE = 3;

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  };

  getMovies = async () => {
    const res = await this.getResource(
      `${REACT_APP_MOVIEDB_URL}/movie/popular?api_key=${REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`,
    );

    return res.results
      .slice(0, this.MAX_FILMS_ON_PAGE)
      .map(this.transformMovie);
  };

  getMovieDetails = async (id) => {
    const movieInfo = await this.getResource(
      `${REACT_APP_MOVIEDB_URL}/movie/${id}?api_key=${REACT_APP_MOVIEDB_API_KEY}&language=en-US`,
    );
    const actorInfo = await this.getResource(
      `${REACT_APP_MOVIEDB_URL}/movie/${id}/credits?api_key=${REACT_APP_MOVIEDB_API_KEY}&language=en-US`,
    );
    const actors = actorInfo.cast
      .filter((elem) => elem.known_for_department === 'Acting')
      .slice(0, this.MAX_ACTORS_ON_PAGE)
      .map(({ id, name }) => ({
        id,
        actorName: name,
      }));
    const director = actorInfo.crew.filter((elem) => elem.job === 'Director');
    return {
      id,
      name: movieInfo.original_title.toLowerCase(),
      description: movieInfo.overview
        ? `${movieInfo.overview.slice(0, this.MAX_DESCRIPTION_LENGTH)}...`
        : 'There is no description for this movie',
      thumbnail: movieInfo.backdrop_path
        ? `${REACT_APP_STORAGE_URL}${movieInfo.backdrop_path}`
        : notFound,
      rating: Math.round(
        movieInfo.vote_average / this.RATING_AND_LIKES_ADAPTATION_KOEF,
      ),
      likes: Math.round(
        movieInfo.vote_average * this.RATING_AND_LIKES_ADAPTATION_KOEF,
      ),
      directorName: director[0].name,
      actors,
    };
  };

  getActorDetails = async (id) => {
    const actorInformation = await this.getResource(
      `${REACT_APP_MOVIEDB_URL}/person/${id}?api_key=${REACT_APP_MOVIEDB_API_KEY}&language=en-US`,
    );
    return {
      id,
      name: actorInformation.name.toLowerCase(),
      description: actorInformation.biography,
      thumbnail: actorInformation.profile_path
        ? `${REACT_APP_STORAGE_URL}${actorInformation.profile_path}`
        : notFound,
    };
  };

  transformMovie = (movie) => ({
    id: movie.id,
    name: movie.title.slice(0, this.MAX_TITLE_LENGTH).toLowerCase(),
    thumbnail: movie.backdrop_path
      ? `${REACT_APP_STORAGE_URL}${movie.backdrop_path}`
      : notFound,
    rating: Math.round(
      movie.vote_average / this.RATING_AND_LIKES_ADAPTATION_KOEF,
    ),
    likes: Math.round(
      movie.vote_average * this.RATING_AND_LIKES_ADAPTATION_KOEF,
    ),
  });
}

export default MovieService;
