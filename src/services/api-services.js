const fetchMovieDetails = movieId => {
  //   const movieId = this.props.match.params.movieId;

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=754954b74cd2707762208fc23a169e09&language=en-US`,
  ).then(res => res.json());
};

const fetchSearchMovie = searchQuery => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=754954b74cd2707762208fc23a169e09&language=en-US&query=${searchQuery}&page=1`,
  )
    .then(res => res.json())
    .then(data => {
      const { results } = data;
      return results;
    });
};

const fetchTrendingMoviesToday = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=754954b74cd2707762208fc23a169e09`,
  ).then(res => res.json());
  // .then (data => data.results);
};

const fetchMovieCast = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=754954b74cd2707762208fc23a169e09`,
  ).then(res =>
    res.json().then(data => {
      const { cast } = data;
      return cast;
    }),
  );
};

const fetchMovieReviews = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=754954b74cd2707762208fc23a169e09`,
  ).then(res => res.json());
};

const fetchMovieTrailer = movieId => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=754954b74cd2707762208fc23a169e09&language=en-US`,
  ).then(res => res.json());
};

export default {
  fetchMovieDetails,
  fetchSearchMovie,
  fetchTrendingMoviesToday,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMovieTrailer,
};
