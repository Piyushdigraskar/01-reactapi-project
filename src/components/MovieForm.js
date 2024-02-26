import React, { useRef } from "react";

const MovieForm = () => {
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

        const NewMovieObj = {
            enteredTitle: enteredTitle,
            enteredOpening: enteredOpening,
            enteredDate: enteredDate
        }
        console.log(NewMovieObj);
        titleRef.current.value = '';
        openingRef.current.value = '';
        dateRef.current.value = '';
    }
    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                type="text"
                ref={titleRef}
            />
            <label htmlFor="opening">opening Text:</label>
            <input
                id="opening"
                type="text"
                ref={openingRef}
            />
            <label htmlFor="date">Date:</label>
            <input
                id="date"
                type="text"
                ref={dateRef }
            />
            <button type="submit">Add Movie</button>
        </form>
    )
}

export default MovieForm;

