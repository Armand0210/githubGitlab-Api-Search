//All imports
import React from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { SingleUser } from "./components/SingleUser";
import { SingleRepo } from "./components/SingleRepo";
import "./App.css";
import { getData } from "./utils/getData.js";

function App() {
  //declaring state hooks
  const [results, setResults] = React.useState(null);
  const [showResults, setShowResults] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [repo, setRepo] = React.useState(null);

  //calling server when a search is made.
  const handleSearch = async (term) => {
    //setting states to null so previous info disappears.
    setUser(null);
    setRepo(null);
    setResults(null);
    setShowResults(true);
    //fetching data and updating state to contain the results.
    const url = `/api/search?term=${term}`;
    const result = await getData(url);
    setResults(result);
  };

  //Show this repo button:
  const displayRepo = async (source, user, repo) => {
    setRepo(null);
    const [repoName, repoId] = repo.split(",");
    //server endpoint url
    const url = `/api/repo?source=${source}&user=${user}&reponame=${repoName}&repoid=${repoId}`;
    const result = await getData(url);
    setRepo(result);
  };

  //fetching/displaying user when "show user" button is pressed.
  const displayUser = async (input) => {
    setUser(null);
    setRepo(null);
    const [source, login] = input.split(",");
    //server endpoint url
    const url = `/api/user?source=${source}&user=${login}`;
    const result = await getData(url);
    //updating state with user object
    setUser(result);
  };

  //back to search button is clicked: setting to 0 - clearing results
  const backToHome = () => {
    setUser(null);
    setRepo(null);
    setResults(null);
    setShowResults(false);
  };
  const backToUser = () => {
    setRepo(null);
  };
  const backToSearch = () => {
    setUser(null);
    setRepo(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Enter Gitlab or Github username:</h1>
      </header>
      <div className="main-body">
        <SearchBar handleSearch={handleSearch}></SearchBar>
        {showResults && (
          <div className="search-results">
            <h2>Results:</h2>
            {!results ? (
              <div className="placeholder">Fetching Results</div>
            ) : results.length === 0 ? (
              <div className="placeholder">No results on Github or Gitlab.</div>
            ) : (
              <SearchResults
                displayUser={displayUser}
                results={results}
              ></SearchResults>
            )}
            <button onClick={backToHome}>Search again</button>
          </div>
        )}
        <div className="maincontainer">
          <div className="first">
            {user && (
              <SingleUser
                backToSearch={backToSearch}
                user={user}
                displayRepo={displayRepo}
              ></SingleUser>
            )}
          </div>
          <div className="second">
            {repo && (
              <SingleRepo backToUser={backToUser} repo={repo}></SingleRepo>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//exporting app
export default App;
