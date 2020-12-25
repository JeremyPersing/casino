import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';



const Home = (props) => {

  return (
    <div>
      <Nav coins={props.coins} usersName={props.usersName} setUsersName={props.setUsersName}/>
      <h1>Home</h1>
      <p>For all of these games, input the amount of coins that you want to bet.</p>
      <div>
        <Link className='text-decoration-none' to='/blackjack'><h2>Blackjack</h2></Link>
        <div className='mt-4 mb-4'>
          {/*<img src={process.env.PUBLIC_URL + '/images/Blackjack-Strat-EDIT.jpg'} style={{height: '300px'}} alt='blackjack-poster'></img>*/}
        </div>
        <p>
          In Blackjack, place your bet and get dealt two cards. From this point if you want 
          a higher total, click the hit button. If you think that you have a winning total,
          click the stand button. At this point, the dealer will deal themself a quantity of
          cards. If you get 21 and the user doesn't, you will receive 1.5x your bet. Otherwise,
          if get a higher total than the dealer and your total doesn't exceed 21, you will 
          win what you bet. For instance, if you start with 100 coins, wager 50 coins and 
          win by getting 21, you will now have 200 coins. If you win without getting 21, then 
          you will have a total of 150 coins.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none' to='/coinflip'><h2>Coin Flip</h2></Link>
        <p>
          The game of Coin Flip is very simple. You place your bet and then choose heads or tails.
          If you win the game you will receive 1x your wager.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none' to='/dice'><h2>Dice Roll</h2></Link>
        <p>
          In Dice Roll, you will place a bet and you have the ability to choose between
          three different multiplier options. Those options include 12x, 4x, and 2x multipliers.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none' to='/crash'><h2>Crash</h2></Link>
        <p>
          In Crash, you have the ability to choose what multiplier you want. The minimum
          multiplier is 2.5x and the maximum multiplier is 15x. Once you place your bet, the meter
          will then fall upon a given multiplier. If your multiplier is less than or equal to what the multiplier 
          falls upon, then you will win an amount of coins that equates to your bet multiplied by the multiplier.
          Otherwise, you will lose your initial bets.
        </p>
      </div>
      <div>
        <Link className='text-decoration-none' to='/roulette'><h2>Roulette</h2></Link>
        <p>
          In Roulette, you have to input a bet and then pick either red, black, or green.
          The multipliers are on the buttons associated with each pick. Choose wisely, as the
          probablity of the options differ.
        </p>
      </div>
    </div>
  );
}

export default Home;
