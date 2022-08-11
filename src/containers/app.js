import React, { Component } from "react";
import CardList from "../components/cardList";
import SearchBox from "../components/searchBox";
import { robots } from "../robots";
import "./app.css";
import Scroll from "../components/scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  // app component that has 2 states
  //app owns the state
  //any component that has state uses the class syntax so that
  //they use the constuctor function to create this.state which
  //is what changes in an app
  //the app can pass things down such as props

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: robots }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  // passed down onSearchChange to search box
  //updates the state in the searchfield to whatever we type

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>loading</h1>
    ) : (
      // we can now communicate to the card list form the info
      // we got in searchbox and tell it to filter the robots to
      //whats in the searchfield
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;
