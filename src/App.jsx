import React, { Component } from "react";
import axios from "axios";
import Character from "./components/Character";
import Spinner from "./components/Spinner";
import "./App.css";

class App extends Component {
  state = { search: "" };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=25`
      );

      data.forEach((el) => {
        el.id = Math.round(Math.random() * 100000000);
        el.liked = false;
      });

      this.setState({ simpsons: data });
    } catch (e) {
      console.log("Looks like the API is down!");
    }
  }

  onLikeClick = (id) => {
    console.log("like clicked", id);
    // copying
    const simpsons = [...this.state.simpsons];
    // finding index
    const characterIndex = simpsons.findIndex(
      (character) => character.id === id
    );
    // toggle liked
    simpsons[characterIndex].liked = !simpsons[characterIndex].liked;
    // save state
    this.setState({ simpsons });
  };

  onDeleteClick = (id) => {
    const simpsons = [...this.state.simpsons];
    const characterIndex = simpsons.findIndex(
      (character) => character.id === id
    );
    simpsons.splice(characterIndex, 1);
    this.setState({ simpsons });
  };

  onInput = (e) => {
    console.log(e.target.value);
    this.setState({ search: e.target.value });
  };

  onSortSelection = (e) => {
    console.log(e.target.value);
    this.setState({ sort: e.target.value });
  };

  render() {
    console.log(this.state);
    const { simpsons, sort } = this.state;

    if (!simpsons) {
      return (
        <div className="container">
          <Spinner />
        </div>
      );
    }

    const localSimpsons = [...simpsons];
    // sort by function
    if (sort === "az") {
      localSimpsons.sort((item1, item2) => {
        if (item1.character > item2.character) {
          return 1;
        }
        if (item1.character < item2.character) {
          return -1;
        }
        return 0;
      });
    }
    if (sort === "za") {
      localSimpsons.sort((item1, item2) => {
        if (item1.character > item2.character) {
          return -1;
        }
        if (item1.character < item2.character) {
          return 1;
        }
        return 0;
      });
    }

    // filtering the data
    const filteredSimpsons = simpsons.filter((item) => {
      return item.character
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    const filteredQuotes = simpsons.filter((item) => {
      return item.quote.toLowerCase().includes(this.state.search.toLowerCase());
    });

    // total liked
    let total = 0;
    filteredSimpsons.forEach((el) => {
      if (el.liked) {
        total++;
      }
    });

    return (
      <div className="container">
        <h1>Simpsons random quote generator</h1>
        <h3>Total Liked: {total}</h3>
        <div className="searchBar">
          <input
            type="text"
            placeholder="search"
            id="search"
            onInput={this.onInput}
          ></input>
          <div className="controls">
            <label htmlFor="sort">Sort by</label>
            <select name="sort" id="sort" onChange={this.onSortSelection}>
              <option value="az">A to Z</option>
              <option value="za">Z to A</option>
            </select>
          </div>
        </div>

        {localSimpsons.map((character) => {
          return (
            <Character
              key={character.id}
              onLikeClick={this.onLikeClick}
              character={character}
              onDeleteClick={this.onDeleteClick}
            />
          );
        })}

        {filteredSimpsons.map((character) => {
          return (
            <Character
              key={character.id}
              onLikeClick={this.onLikeClick}
              character={character}
              onDeleteClick={this.onDeleteClick}
            />
          );
        })}
        {filteredQuotes.map((character) => {
          return (
            <Character
              key={character.id}
              onLikeClick={this.onLikeClick}
              character={character}
              onDeleteClick={this.onDeleteClick}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
