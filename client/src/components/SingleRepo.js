import React from "react";
import { CommitList } from "./CommitList";
import PropTypes from "prop-types";
import { getData } from "../utils/getData.js";

//this function is used to take a prop in the form of a repo project.
export function SingleRepo(props) {
  //top 5 commit info
  const [commits, setCommits] = React.useState(null);
  //when component is rendered the function will render and fetch the list of commits.
  React.useEffect(() => {
    const fetchData = async () => {
      //constructing server end point
      const url = `/api/commits?source=${props.repo.source}&user=${props.repo.owner}&reponame=${props.repo.name}&repoid=${props.repo.id}`;
      //fetching the data and storing it in result variable.
      const result = await getData(url);
      //updating the state to store the variable contents.
      setCommits(result);
    };
    //calling function for fetch
    fetchData();
  }, [props.repo]);
  return (
    <div className="single-repo">
      <h2>{props.repo.name}</h2>
      <div className="abc">
        <p>
          {props.repo.description}
          <br></br>
          <br></br>
          <strong>Created Date: </strong>
          {props.repo.created_at}
          <br></br>
          <strong>Last Updates Date: </strong>
          {props.repo.updated_at}
          <br></br>
        </p>
        <h3>Last 5 commits:</h3>
        {!commits ? (
          <div className="placeholder">Loading...</div>
        ) : commits.length === 0 ? (
          <div className="placeholder">No commits yet</div>
        ) : (
          <CommitList commits={commits}></CommitList>
        )}
      </div>
      <div className="abc">
        <button onClick={props.backToUser}>Back to profile</button>
      </div>
    </div>
  );
}

//required props
SingleRepo.propTypes = {
  repo: PropTypes.object.isRequired,
  backToUser: PropTypes.func.isRequired,
};
