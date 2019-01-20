import React, {Component} from "react";
import "./GameMessage.css";

class GameMessage extends Component {

    state = {
        animating: false,
        message: ""
    }

    componentDidUpdate(prevProps) {

      let newState = {
        animating: true
      }

      const {score, topScore} = prevProps

      if (score === 0 && topScore === 0) {
        newState.message = "";
      } else if (score !== 0 && topScore > 0) {
        newState.message = "correct";
      } else {
        newState.message = "incorrect";
      }

      // set the state with the new message if the score changes, 
      // or the message and state message are not equal
      if (score !== this.props.score || this.state.message !== newState.message) {
        this.setState(newState);
      }
  
    }

    // change the display message based on the message state
    renderMessage = () => {
        switch (this.state.message) {
        case "correct":
          return "You guessed correctly!";
        case "incorrect":
          return "You guessed incorrectly!";
        default:
          return "Click a puppy to begin!";
        }
    };

    // add animation class when animateClass state updates
    // animations from aniamte.css library
    addAnimation = () => {
      switch (this.state.message) {
        case "correct":
          return "animated pulse";
        case "incorrect":
          return "animated wobble";
        default:
          return "";
        }     
    }

    render() {
        return(
          <li 
            className={` 
              gameMessage 
              ${this.state.animating? this.addAnimation(): ""}  
              ${this.state.animating? this.state.message: "black"}
            `}
            id={`${this.state.message}`}
            onAnimationEnd={() => this.setState({ animating: false })} 
          >
            {this.renderMessage()}
          </li>  
        );
    }
}

export default GameMessage;
