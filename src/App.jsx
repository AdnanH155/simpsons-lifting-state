import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./components/Character";
import Spinner from "./components/Spinner";
import "./App.css";

const App = () => {
  const [simpsons, setSimpsons] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("az");
  const getApiData = async () => {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=25`
      );

      data.forEach((el) => {
        el.id = Math.round(Math.random() * 100000000);
        el.liked = false;
      });

      setSimpsons(data);
      console.log(data);
    } catch (e) {
      console.log("Looks like the API is down!");
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  const onInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onSortSelection = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
  };

  if (!simpsons) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  const filteredSimpsons = simpsons.filter((item) => {
    return item.character.toLowerCase().includes(search.toLowerCase());
  });

  const onLikeClick = (id) => {
    console.log("like clicked", id);
    // copying
    const _simpsons = [...simpsons];
    // finding index
    const characterIndex = _simpsons.findIndex(
      (character) => character.id === id
    );
    // toggle liked
    _simpsons[characterIndex].liked = !_simpsons[characterIndex].liked;
    // save state
    setSimpsons(_simpsons);
  };

  const onDeleteClick = (id) => {
    const _simpsons = [...simpsons];
    const characterIndex = _simpsons.findIndex(
      (character) => character.id === id
    );
    _simpsons.splice(characterIndex, 1);
    setSimpsons(_simpsons);
  };

  // total liked
  let total = 0;
  simpsons.forEach((el) => {
    if (el.liked) {
      total++;
    }
  });

  // sort by function
  if (sort === "az") {
    filteredSimpsons.sort((item1, item2) => {
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
    filteredSimpsons.sort((item1, item2) => {
      if (item1.character > item2.character) {
        return -1;
      }
      if (item1.character < item2.character) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <div className="container">
      <h1>Simpsons random quote generator</h1>
      <h3>Total Liked: {total}</h3>
      <div className="searchBar">
        <input
          type="text"
          placeholder="search"
          id="search"
          onInput={onInput}
        ></input>
        <div className="controls">
          <label htmlFor="sort">Sort by</label>
          <select name="sort" id="sort" onChange={onSortSelection}>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </div>
      </div>

      {filteredSimpsons.map((character) => {
        return (
          <Character
            key={character.id}
            onLikeClick={onLikeClick}
            character={character}
            onDeleteClick={onDeleteClick}
          />
        );
      })}
    </div>
  );
};
export default App;

// class App extends Component {
//   state = { search: "" };

//   async componentDidMount() {
//
//   }

//   render() {
//     console.log(this.state);
//     const { simpsons, sort } = this.state;

//

//     return (
//       <div className="container">
//         <h1>Simpsons random quote generator</h1>
//         <h3>Total Liked: {total}</h3>
//         <div className="searchBar">
//           <input
//             type="text"
//             placeholder="search"
//             id="search"
//             onInput={this.onInput}
//           ></input>
//           <div className="controls">
//             <label htmlFor="sort">Sort by</label>
//             <select name="sort" id="sort" onChange={this.onSortSelection}>
//               <option value="az">A to Z</option>
//               <option value="za">Z to A</option>
//             </select>
//           </div>
//         </div>

//         {filteredSimpsons.map((character) => {
//           return (
//             <Character
//               key={character.id}
//               onLikeClick={this.onLikeClick}
//               character={character}
//               onDeleteClick={this.onDeleteClick}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default App;
