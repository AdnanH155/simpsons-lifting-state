import React, { Component } from "react";
import Button from "./Button";

class Controls extends Component {
  render() {
    const { id, liked, onLikeClick, onDeleteClick } = this.props;
    return (
      <div className="controls">
        <Button text={"Delete"} id={id} onClick={onDeleteClick} />
        <Button
          id={id}
          className={liked ? "liked" : "not-liked"}
          liked={liked}
          onClick={onLikeClick}
          text={liked ? "Liked" : "Like"}
        />
      </div>
    );
  }
}

export default Controls;
