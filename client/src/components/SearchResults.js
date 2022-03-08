import React from "react";
import PropTypes from "prop-types";

//this function takes in prop in the form of an array of result objects.
export function SearchResults(props) {
  //fetches list of repos from given props
  const results = props.results;
  //triggered when button is clicked, invokes displayUser function (prop)
  const handleClick = (e) => {
    props.displayUser(e.target.value);
  };
  //per search result display name,source and assign key to it
  const resultsList = results.map((result) => {
    return (
      <li key={result.id} className="result-bullet">
        <p>
          <strong>Username: </strong>
          {result.login} <br></br>
          <strong>Source: </strong>
          {result.source} <br></br>
        </p>
        <button
          //2 values needed by api
          value={[result.source, result.login]}
          onClick={handleClick}
        >
          View user
        </button>
      </li>
    );
  });
  return <ul className="results-list">{resultsList}</ul>;
}

//required props
SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  displayUser: PropTypes.func.isRequired,
};
