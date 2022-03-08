import React from "react";
import { SearchResults } from "../components/SearchResults";
import renderer from "react-test-renderer";
//Tested a random user - test if components renders correctly
test("SearchResults shows results when a search is complete", () => {
  let resultSet = [
    {
      id: 737241,
      name: null,
      login: "Ram-N",
      avatar: "https://avatars.githubusercontent.com/u/737241?v=4",
      url: "https://api.github.com/users/Ram-N",
      source: "Github",
    },
    {
      id: 243,
      name: "inkscape",
      login: "inkscape",
      avatar:
        "https://gitlab.com/uploads/-/system/project/avatar/15192091/inkscape.png?width=64",
      url: "https://gitlab.com/inkscape",
      source: "Gitlab",
    },
  ];
  const tree = renderer
    .create(
      <SearchResults
        results={resultSet}
        displayUser={function displayUser() {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
