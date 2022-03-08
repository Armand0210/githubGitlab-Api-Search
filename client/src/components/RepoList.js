import React from "react";
import PropTypes from "prop-types";

//Displays props as ordered lists
export function RepoList(props) {
  //fetches list of repos from given props
  const repos = props.repos;
  //when butten is clicked invokes displayrepo function(prop)
  const handleClick = (e) => {
    props.displayRepo(props.user.source, props.user.login, e.target.value);
  };
  //Display name and assign unique id/key.
  const reposList = repos.map((repo) => {
    return (
      <li key={repo.id}>
        <div className="repo-bullet">
          <span>{repo.name}</span>
          <button
            //assigning 2 values, the server IP uses these two
            value={[repo.name, repo.id]}
            onClick={handleClick}
          >
            View repo
          </button>
        </div>
      </li>
    );
  });
  return <ol className="repo-list">{reposList}</ol>;
}

//required props
RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  displayRepo: PropTypes.func.isRequired,
};
