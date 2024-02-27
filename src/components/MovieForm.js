import React, { useRef } from "react";
import classes from './MovieForm.module.css';

const MovieForm = (props) => {
    const titleRef = useRef();
    const openingRef = useRef();
    const dateRef = useRef();
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredTitle = titleRef.current.value;
        const enteredOpening = openingRef.current.value;
        const enteredDate = dateRef.current.value;
        if (enteredDate.trim().length === 0 || enteredTitle.trim().length === 0 || enteredOpening.trim().length === 0) {
            return;
        }

        const movie = {
            enteredTitle: enteredTitle,
            enteredOpening: enteredOpening,
            enteredDate: enteredDate
        }
        props.onAddMovie(movie);;
        titleRef.current.value = '';
        openingRef.current.value = '';
        dateRef.current.value = '';
    }
    return (
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' ref={titleRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='opening-text'>Opening Text</label>
            <textarea rows='5' id='opening-text' ref={openingRef}></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='date'>Release Date</label>
            <input type='text' id='date' ref={dateRef} />
          </div>
          <button>Add Movie</button>
        </form>
      );
}

export default MovieForm;

