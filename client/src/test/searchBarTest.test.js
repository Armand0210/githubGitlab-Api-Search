import React from "react";
import { SearchBar } from "../components/SearchBar";
import renderer from "react-test-renderer";

//Snapshot test to make sure the component renders properly
test("SearchBar is shown", () => {
  const tree = renderer
    //Declare empty function here, as this prop and its type (function)
    //is required by propTypes and therefore the test will fail if not
    //included here
    .create(<SearchBar handleSearch={function handleSearch() {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
