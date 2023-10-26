import React, { Component } from "react";

class Button extends Component {
  // state = { clicked: false };

  render() {
    // console.log(this.state);
    const { text, onClick, id, liked } = this.props;
    // const { clicked } = this.state;
    return (
      <button
        // className={liked ? "liked" : "not-liked"}
        onClick={() => onClick(id)}
      >
        {text}
      </button>
    );
  }
}

export default Button;
