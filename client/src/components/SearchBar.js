import React from "react";
import PropTypes from "prop-types";

//takes prop in form of search function and displays form.
//if input is intered it updates its own state when form is submitted.
export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchString: "" };
    //Binding two functions below.
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //when input is detected inside input field, Update state to reflect new values.
  handleUserInput(e) {
    this.setState({ searchString: e.target.value });
  }
  //When form is submitted - begin search
  handleSubmit(e) {
    //prevent refresh
    e.preventDefault();
    this.props.handleSearch(this.state.searchString);
    //clearing input Field
    this.setState({ searchString: "" });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleUserInput}
            className="search-input"
            required
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

//required prop
SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
