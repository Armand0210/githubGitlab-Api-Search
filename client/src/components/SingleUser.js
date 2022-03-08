import React from "react";
import { RepoList } from "./RepoList";
import PropTypes from "prop-types";
import { getData } from "../utils/getData.js";

//takes prop in the form of a user object and displays the details.
export function SingleUser(props) {
  //contain top 5 repos
  const [repos, setRepos] = React.useState(null);
  //on render the function will run and fetch list of repos
  React.useEffect(() => {
    const fetchData = async () => {
      const url = `/api/repos?source=${props.user.source}&user=${props.user.login}`;
      const result = await getData(url);
      setRepos(result);
    };
    fetchData();
    //running every time users info changes
  }, [props.user]);

  return (
    <div className="single-user">
      <h2>{props.user.login}</h2>
      <div className="user-details">
        <img src={props.user.avatar} alt="user avatar" className="avatar"></img>
        <p>
          <a href={props.user.url}>{props.user.url}</a>
        </p>
        <h3>Last 5 repositories:</h3>
        {!repos ? (
          <div className="placeholder">Fetching last 5 repositories</div>
        ) : repos.length === 0 ? (
          <div className="placeholder">No repositories</div>
        ) : (
          <RepoList
            user={props.user}
            repos={repos}
            displayRepo={props.displayRepo}
          ></RepoList>
        )}
      </div>
      <div className="abc">
        <button onClick={props.backToSearch}>Back to results</button>
      </div>
    </div>
  );
}

//required props
SingleUser.propTypes = {
  user: PropTypes.object.isRequired,
  backToSearch: PropTypes.func.isRequired,
  displayRepo: PropTypes.func.isRequired,
};
