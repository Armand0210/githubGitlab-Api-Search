//necessary imports
var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

//calling api and changing results to json.
const getData = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

//cors settings
//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
router.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//api endpoint to return single user.
router.get("/api/user", async (req, res, next) => {
  //extracting data and creating url's
  const user = req.query.user;
  const source = req.query.source;
  const urlGithub = `https://api.github.com/users/${user}`;
  const urlGitlab = `https://gitlab.com/api/v4/users?username=${user}`;
  try {
    //call github or gitlab dependent on source
    if (source === "Github") {
      //api call
      const data = await getData(urlGithub);
      if (data.message === "Not Found") {
        res.status(500).send("User not found");
      } else {
        const resultGithub = {
          id: data.id,
          name: data.name,
          login: data.login,
          avatar: data.avatar_url,
          url: data.url,
          source: "Github",
        };
        res.send(resultGithub);
      }
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      if (!data[0]) {
        res.status(500).send("User not found");
      } else {
        const resultGitlab = {
          id: data[0].id,
          name: data[0].name,
          login: data[0].username,
          avatar: data[0].avatar_url,
          url: data[0].web_url,
          source: "Gitlab",
        };
        res.send(resultGitlab);
      }
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/api/repos", async (req, res, next) => {
  //construct url endpoints from data received
  const user = req.query.user;
  const source = req.query.source;
  const urlGithub = `https://api.github.com/users/${user}/repos`;
  const urlGitlab = `https://gitlab.com/api/v4/users/${user}/projects`;
  try {
    if (source === "Github") {
      const data = await getData(urlGithub);
      if (data.message === "Not Found") {
        res.status(500).send("Repositories not found");
      } else {
        const resultGithub = data.map((object) => {
          return {
            id: object.id,
            name: object.name,
            description: object.description,
            created_at: object.created_at,
            updated_at: object.updated_at,
          };
        });
        //limiting results to top 5
        const top5ReposGithub = resultGithub.splice(0, 5);
        res.send(top5ReposGithub);
      }
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      if (!data[0]) {
        res.status(500).send("User not found");
      } else {
        const resultGitlab = data.map((object) => {
          return {
            id: object.id,
            name: object.name,
            description: object.description,
            created_at: object.created_at,
            updated_at: object.last_activity_at,
          };
        });
        const top5ReposGitlab = resultGitlab.splice(0, 5);
        res.send(top5ReposGitlab);
      }
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
  } catch (err) {
    next(err);
  }
});

//api endpoint. search results from term
router.get("/api/search", async (req, res, next) => {
  //data received from request and constructs url
  const term = req.query.term;
  const urlGithub = `https://api.github.com/users/${term}`;
  const urlGitlab = `https://gitlab.com/api/v4/users?username=${term}`;
  //init empty array for results
  let resultsArray = [];

  try {
    //fetching the results from github
    const dataGithub = await getData(urlGithub);
    if (dataGithub.message !== "Not Found") {
      //github properties to keys
      const resultGithub = {
        id: dataGithub.id,
        name: dataGithub.name,
        login: dataGithub.login,
        avatar: dataGithub.avatar_url,
        url: dataGithub.url,
        source: "Github",
      };
      //add object to array
      resultsArray.push(resultGithub);
    }

    //fetching results from gitlab
    const dataGitlab = await getData(urlGitlab);
    if (dataGitlab[0]) {
      const resultGitlab = {
        id: dataGitlab[0].id,
        name: dataGitlab[0].name,
        login: dataGitlab[0].username,
        avatar: dataGitlab[0].avatar_url,
        url: dataGitlab[0].web_url,
        source: "Gitlab",
      };
      resultsArray.push(resultGitlab);
    }
    res.send(resultsArray);
  } catch (err) {
    next(err);
  }
});
//showing user's commits
router.get("/api/commits", async (req, res, next) => {
  //constructing url's from data received
  const source = req.query.source;
  const user = req.query.user;
  const repoName = req.query.reponame;
  const repoId = req.query.repoid;
  const urlGithub = `https://api.github.com/repos/${user}/${repoName}/commits`;
  const urlGitlab = `https://gitlab.com/api/v4/projects/${repoId}/repository/commits`;
  try {
    if (source === "Github") {
      const data = await getData(urlGithub);
      if (data.message === "Not Found") {
        res.status(500).send("Repositories not found");
      } else {
        const resultGithub = data.map((object) => {
          return {
            id: object.sha,
            message: object.commit.message,
            committed_date: object.commit.committer.date,
          };
        });
        const top5ResultsGithub = resultGithub.slice(0, 5);
        res.send(top5ResultsGithub);
      }
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      if (data.message === "404 Project Not Found") {
        res.status(500).send("Repository not found");
      } else {
        const resultGitlab = data.map((object) => {
          return {
            id: object.id,
            message: object.message,
            committed_date: object.committed_date,
          };
        });
        const top5ResultsGitlab = resultGitlab.slice(0, 5);
        res.send(top5ResultsGitlab);
      }
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
  } catch (err) {
    next(err);
  }
});

//endpoint to return a single repo to the user
router.get("/api/repo", async (req, res, next) => {
  //extracting data and constructing url's
  const source = req.query.source;
  const user = req.query.user;
  const repoName = req.query.reponame;
  const repoId = req.query.repoid;
  const urlGithub = `https://api.github.com/repos/${user}/${repoName}`;
  const urlGitlab = `https://gitlab.com/api/v4/projects/${repoId}`;
  try {
    if (source === "Github") {
      const data = await getData(urlGithub);
      if (data.message === "Not Found") {
        res.status(500).send("Repository not found");
      } else {
        const result = {
          id: data.id,
          name: data.name,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.updated_at,
          owner: user,
          source: "Github",
        };
        res.send(result);
      }
    } else if (source === "Gitlab") {
      const data = await getData(urlGitlab);
      if (data.message === "404 Project Not Found") {
        res.status(500).send("Repository not found");
      } else {
        const result = {
          id: data.id,
          name: data.name,
          description: data.description,
          created_at: data.created_at,
          updated_at: data.last_activity_at,
          owner: user,
          source: "Gitlab",
        };
        res.send(result);
      }
      //throwing error if source is not defined
    } else {
      throw new Error("not one of the sources Github or Gitlab");
    }
  } catch (err) {
    next(err);
  }
});

//exports
module.exports = router;
