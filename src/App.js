import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryIntervalId, setRetryIntervalId] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setRetryIntervalId(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something Went wrong......retrying');
      }
      const data = await response.json();

      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      const intervalId = setInterval(fetchMoviesHandler, 5000);
      setRetryIntervalId(intervalId);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [])
  
  useEffect(() => {
    return () => {
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
    }
  }, [retryIntervalId])
  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }
  if (error) {
    content = (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={fetchMoviesHandler}>Retry</button>
      </React.Fragment>
    );
  }
  if (isLoading) {
    content = <p>Loading....</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={isLoading}>
          Fetch Movies
        </button>
        {retryIntervalId && (
          <button onClick={() => clearInterval(retryIntervalId)}>
            Cancel Retry
          </button>
        )}
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
