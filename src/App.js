import React, { Component } from 'react';
import MemCard from './components/MemCard';
import Wrapper from './components/Wrapper';
import Score from './components/Score';
import cards from './cards.json';
import './App.css';

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedImg: [],
    score: 0,
    goal: 8,
    status: ''
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedImg = this.state.clickedImg;

    if (clickedImg.includes(id)) {
      this.setState({
        clickedImg: [],
        score: 0,
        status: 'Game Over! You lost. Click to play again!'
      });
      return;
    } else {
      clickedImg.push(id);

      if (clickedImg.length === 8) {
        this.setState({
          score: 8,
          status: 'You Won! Click to play again!',
          clickedImg: []
        });
        console.log('You Win');
        return;
      }

      this.setState({
        cards,
        clickedImg,
        score: clickedImg.length,
        status: ' '
      });

      for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }
  };

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Clicky Game</h1>
        </header>
        <Score total={this.state.score} goal={8} status={this.state.status} />
        <Wrapper>
          {this.state.cards.map(card => (
            <MemCard
              shuffleScoreCard={this.shuffleScoreCard}
              id={card.id}
              key={card.id}
              image={card.image}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
