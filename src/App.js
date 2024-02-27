import React, { useState, useEffect, useCallback } from 'react';
import MovieForm from './components/MovieForm';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-apiproject-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('Something Went wrong......retrying');
      }
      const data = await response.json();
      const loadedMovies = [];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].enteredTitle,
          openingText:data[key].enteredOpening,
          releaseDate:data[key].enteredDate
        })
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])

  async function addMovieHandler(movie){
    const response = await fetch('https://react-apiproject-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'content-type':'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }
  async function deleteMovieHandler(movieId){
    try {
      setIsLoading(true);
    setError(null);

    const response = await fetch(`https://react-apiproject-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieId}.json`,{
      method:'DELETE'
    })
    if(!response.ok){
      throw new Error('Deletion went Wrong')
    }
    setMovies((prevMovie => prevMovie.filter(movie => movie.id !== movieId)));
    } catch (error) {
      setError(error.message);  
    }
  }
  let content = <p>Found no movies</p>

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler}/>
  }
  if (error) {
    content = (
      
        <p>{error}</p>
    );
  }
  if (isLoading) {
    content = <p>Loading....</p>
  }

  return (
    <React.Fragment>
      <section>
        <MovieForm onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler} disabled={isLoading}>
          Fetch Movies
        </button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
