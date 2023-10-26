import React, { Component } from "react";

class Button extends Component {
  // state = { clicked: false };

  render() {
    // console.log(this.state);
    const { text, handleLike, id, liked } = this.props;
    // const { clicked } = this.state;
    return (
      <button
        className={liked ? "liked" : "not-liked"}
        onClick={() => handleLike(id)}
      >
        &#128077;
      </button>
    );
  }
}

export default Button;
