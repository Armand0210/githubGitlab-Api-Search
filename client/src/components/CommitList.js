import React from "react";
import PropTypes from "prop-types";

//displaying an ordered list of props in the form of an array.
export function CommitList(props) {
  const commits = props.commits;
  //display message and date with unique key for each commit.
  const commitsList = commits.map((commit) => {
    return (
      <li key={commit.id} className="commit-bullet">
        {commit.message} <br></br>({commit.committed_date})
      </li>
    );
  });
  return <ol className="commits-list">{commitsList}</ol>;
}
//required props
CommitList.propTypes = {
  commits: PropTypes.array.isRequired,
};
