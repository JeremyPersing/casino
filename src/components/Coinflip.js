import React from 'react';
import '../CSS/coin-animation.css';

const Coinflip = (props) => {


    const outcome = (flip, guess) => {
        // 0 is heads and 1 is tails
        if (flip === guess) {
            let result = props.wager * 2;
            
            let endResult = props.coins + result;
            console.log(endResult)
            props.setCoins(endResult);
        }
        else {
            console.log('Better luck next time')
        }
    }

    const coinToss = (num) => {
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betButton').style = 'visibility: visible';
        let doc = document.getElementById('outcome');
        // Generate a random number between 0 and 1
        let random = Math.floor(Math.random() * 2);
        console.log(random)
        // If the random number is 0 display heads
        if (random === 0) {
            doc.innerHTML = `<img src=${process.env.PUBLIC_URL + '/images/Coins/heads.png'} class='animate-coin' height='200px' alt='heads'></img>`;
        }
        else {
            doc.innerHTML = `<img src=${process.env.PUBLIC_URL + '/images/Coins/tails.png'} class='animate-coin' height='200px' alt='tails'></img>`;
        }

        // Determine if the user won or not
        outcome(random, num);
    }

    const play = (event) => {
        // Doesn't reload page
        event.preventDefault();
        
        // Deduct the amount of coins wagered from the total amount of coins
        let currCoins = props.coins - props.wager;
        
        // Only all the user to play if they have enough coins
        if (currCoins >= 0) {
            document.getElementById('betButton').style = 'visibility: hidden';
            props.setCoins(currCoins);
            // Change the buttons to visible
            document.getElementById('buttonsDiv').style = 'visibility: visible';
        }
        else {
            alert('You need some more coins')
        }
    }

    const handleWagerChange = (event) => {
        props.setWager(event.target.value);
    }

    return (
        <div>
            <h1>Pick One</h1>
            <p>Double or nothing</p>
            <div id='outcome'>
                <img src={process.env.PUBLIC_URL + '/images/Coins/tails.png'} style={{height: '200px'}} alt='heads'></img>
            </div>
            <form onSubmit={play}>
                <div>
                    <label>Bet</label>
                    <input type='number'step='.01' min={.01} max={props.coins} required onChange={handleWagerChange} id='wager'></input>
                </div>
                <input id='betButton' type='submit' value='Place Bet'></input>
            </form>
            <div id='buttonsDiv' style={{visibility: 'hidden'}}>
                <button onClick={() => {coinToss(0)}}>Heads</button>
                <button onClick={() => {coinToss(1)}}>Tails</button>
            </div>
            
        </div>
    )
}

export default Coinflip;