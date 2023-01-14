import React, { useEffect, useRef, useState } from 'react';
import Ball from './Ball';
import Brick from './Brick';
import Paddle from './Paddle';
import './game.css'


const Game = () => {
    const canvasRef = useRef(null);
  const [bricks, setBricks] = useState([
    { x: 20, y: 20, color: "blue" },
    // { x: 120, y: 20, color: "red" },
    // { x: 220, y: 20, color: "green" },
    // and so on
  ]);
  const [ballX, setBallX] = useState(400);
  const [ballY, setBallY] = useState(300);
  const [ballRadius, setBallRadius] = useState(10);
  const [ballSpeedX, setBallSpeedX] = useState(2);
  const [ballSpeedY, setBallSpeedY] = useState(-2);
  const [score, setScore] = useState(0);

  const handleCollision = () => {
    setScore(score + 1);
    // you can handle collision here like removing the brick
  };

  const startGame = () => {
    // code to start the game
    // e.g. setInterval to update the ball position
    // or set some flag to indicate the game has started
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bricks.forEach((brick) => {
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, 80, 30);
    });
    let ball = { x: ballX, y: ballY, radius: ballRadius, speedX: ballSpeedX, speedY: ballSpeedY };
    bricks.forEach((brick) => {
      let brickRect = { x: brick.x, y: brick.y, width: 80, height: 30 };
      if (collisionDetection(ball, brickRect)) {
        ball.speedY = -ball.speedY;
        handleCollision();
      }
    });
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fillRect(400, 550, 100, 20);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
      ballSpeedY = -ballSpeedY;
    }
    if (ballY + ballRadius > 550 && ballX + ballRadius > 400 && ballX - ballRadius < 500) {
        ballSpeedY = -ballSpeedY;
        }
        }, [bricks, ballX, ballY, ballRadius, ballSpeedX, ballSpeedY, handleCollision]);
        
        function collisionDetection(ball, brick) {
        let x = ball.x;
        let y = ball.y;
        let r = ball.radius;
        let bx = brick.x;
        let by = brick.y;
        let bw = brick.width;
        let bh = brick.height;
        if (x + r > bx && x - r < bx + bw && y + r > by && y - r < by + bh) {
        return true;
        } else {
        return false;
        }
        }
  
  return (
    <div className='game'>
      <Ball ballX={ballX} ballY={ballY} ballRadius={ballRadius} ballSpeedX={ballSpeedX} ballSpeedY={ballSpeedY}/>
      {bricks.map((brick, index) => (
        <Brick key={index} {...brick} ballX={ballX} ballY={ballY} ballRadius={ballRadius} onCollision={handleCollision} />
      ))}
      <Paddle/>
      <div id="game-info">
        <p>Score: {score}</p>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default Game;