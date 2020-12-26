import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import '../CSS/styles.css';
import SpinningCoin from '../coin-flip.gif';

const Home = (props) => {

  return (
    <div>
      <Nav coins={props.coins} usersName={props.usersName} setUsersName={props.setUsersName}/>
      <h1>Home</h1>
      <p>For all of these games, input the amount of coins that you want to bet.</p>
      <div>
        <Link className='text-decoration-none home-link' to='/blackjack'><h2 className='mt-4'>Blackjack</h2></Link>
        <div className='mt-4 mb-4'>
        <Link to='/blackjack'>
          <img src={process.env.PUBLIC_URL + '/images/Blackjack-Strat-EDIT.jpg'} className='responsive' alt='blackjack-poster'></img>
        </Link>
        </div>
        <p>
          <b>Rules: </b>
          <br></br>
          In Blackjack, place your bet and get dealt two cards. From this point if you want 
          a higher total, click the hit button. If you think that you have a winning total,
          click the stand button. At this point, the dealer will deal themself a quantity of
          cards. If you get 21 and the dealer doesn't, you will receive 2.5x your bet. Otherwise,
          if get a higher total than the dealer and your total doesn't exceed 21, you will 
          win what you bet. For instance, if you start with 100 coins, wager 50 coins and 
          win by getting 21, you will now have 200 coins. If you win without getting 21, then 
          you will have a total of 150 coins.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none home-link' to='/coinflip'><h2 className='mt-4'>Coin Flip</h2></Link>
        <div className='mt-4 mb-4'>
          <Link to='/coinflip'>
            <img src={SpinningCoin} className='responsive' alt='flipping coin gif'></img>
          </Link>
        </div>
        <p>
          <b>Rules: </b>
          <br></br>
          The game of Coin Flip is very simple. You place your bet and then choose heads or tails.
          If you win the game you will double your wager.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none home-link' to='/dice'><h2 className='mt-4'>Dice Roll</h2></Link>
        <div className='mt-4 mb-4'>
          <Link to='/dice'>
            <img src={process.env.PUBLIC_URL + '/images/dice.png'} className='responsive' alt='dice'></img>
          </Link>
        </div>
        <p>
          <b>Rules: </b>
          <br></br>
          In Dice Roll, you will place a bet and you have the ability to choose between
          three different multiplier options. Those options include 12x, 4x, and 2x multipliers.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none home-link' to='/crash'><h2 className='mt-4'>Crash</h2></Link>
        <div className='mt-4 mb-4'>
          <Link to='/crash'>
            <img src={process.env.PUBLIC_URL + '/images/crash-chart.jpg'} className='responsive' alt='dice'></img>
          </Link>
        </div>
        <p>
          <b>Rules: </b>
          <br></br>
          In Crash, you have the ability to choose what multiplier you want. The minimum
          multiplier is 2.5x and the maximum multiplier is 15x. Once you place your bet, the meter
          will then fall upon a given multiplier. If your multiplier is less than or equal to what the multiplier 
          falls upon, then you will win an amount of coins that equates to your bet multiplied by the multiplier.
          Otherwise, you will lose your initial bets.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none home-link' to='/roulette'><h2 className='mt-4'>Roulette</h2></Link>
        <div className='mt-4 mb-4'>
          <Link to='/roulette'>
            <img src={process.env.PUBLIC_URL + '/images/roulette-wheel.jpg'} className='responsive' alt='dice'></img>
          </Link>
        </div>
        <p>
          <b>Rules: </b>
          <br></br>
          In Roulette, you have to input a bet and then pick either red, black, or green.
          The multipliers are on the buttons associated with each pick. Choose wisely, as the
          probablity of the options differ.
        </p>
      </div>
    </div>
  );
}

export default Home;
