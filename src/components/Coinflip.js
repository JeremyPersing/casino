import React from 'react';
import '../CSS/coin-animation.css';




const Coinflip = () => {


    const outcome = (flip, guess) => {
        // 0 is heads and 1 is tails
        if (flip === guess) {
            console.log('winner');
        }
        else {
            console.log('Better luck next time')
        }
    }

    const coinToss = (num) => {
        let doc = document.getElementById('outcome');
        // Generate a random number between 1 and 2
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

    return (
        <div>
            <h1>Pick One</h1>
            <p>Double or nothing</p>
            <div id='outcome'>
                <img src={process.env.PUBLIC_URL + '/images/Coins/tails.png'} style={{height: '200px'}} alt='heads'></img>
            </div>
            <button onClick={() => {coinToss(0)}}>Heads</button>
            <button onClick={() => {coinToss(1)}}>Tails</button>
            
        </div>
    )
}

export default Coinflip;