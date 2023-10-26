import React, { Component } from "react";
import Button from "./Button";

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        {/* add delete button here later */}
        {/* <Button text={"Delete"} /> */}
        <Button
          id={this.props.id}
          liked={this.props.liked}
          handleLike={this.props.handleLike}
          text={"Liked"}
        />
      </div>
    );
  }
}

export default Controls;
