import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div>
        <canvas id="game-canvas" width={800} height={600} />
        <div id="game-info">
          <p>Score: 0</p>
          <button onClick={this.startGame}>Start Game</button>
        </div>
      </div>
    );
  }
}

export default Game;