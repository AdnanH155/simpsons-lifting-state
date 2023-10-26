import React, { Component } from "react";
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Controls from "./Controls";

class Character extends Component {
  render() {
    const { character, quote, image, characterDirection, id, liked } =
      this.props.character;

    // console.log(characterDirection);

    if (characterDirection === "Left") {
      return (
        <div className={liked ? "character liked" : "character"}>
          <Name name={character} />
          <Image image={image} />
          <Quote quote={quote} />
          <Controls id={id} liked={liked} handleLike={this.props.handleLike} />
        </div>
      );
    }

    return (
      <div className={liked ? "character liked" : "character"}>
        <Name name={character} />
        <Quote quote={quote} />
        <Image image={image} />
        <Controls id={id} liked={liked} handleLike={this.props.handleLike} />
      </div>
    );
  }
}

export default Character;
