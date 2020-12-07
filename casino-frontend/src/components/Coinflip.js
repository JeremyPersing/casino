import React from 'react';
import '../CSS/coin-animation.css';

const Coinflip = (props) => {


    const outcome = (flip, guess) => {
        // 0 is heads and 1 is tails
        if (flip === guess) {
            let result = props.wager * 2;
            
            let endResult = props.coins + result;
            props.setCoins(endResult);
        }
    }

    const coinToss = (num) => {
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betForm').style = 'visibility: visible';
        let doc = document.getElementById('outcome');
        // Generate a random number between 0 and 1
        let random = Math.floor(Math.random() * 2);
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
           
        document.getElementById('betForm').style = 'visibility: hidden';
        props.setCoins(currCoins);
        // Change the buttons to visible
        document.getElementById('buttonsDiv').style = 'visibility: visible';
    }

    const handleWagerChange = (event) => {
        props.setWager(event.target.value);
    }

    return (
        <div>
            <h1>Coin Flip</h1>
            <div className='mt-4 mb-4' id='outcome'>
                <img src={process.env.PUBLIC_URL + '/images/Coins/tails.png'} style={{height: '200px'}} alt='heads'></img>
            </div>
            <form className='form-group' onSubmit={play}>
                <div id='betForm'>
                    <div className='col-md-4 mx-auto'>
                        <label className='font-weight-bold' htmlFor='bet'>Bet</label>
                        <input className='form-control' name='bet' type='number'step='.01' min={.01} max={props.coins} required onChange={handleWagerChange} id='wager'></input>
                    </div>
                    <input className='btn btn-dark pl-3 pr-3 mt-2' type='submit' value='Place Bet'></input>
                </div>
            </form>
            <div id='buttonsDiv' style={{visibility: 'hidden'}}>
                <button className='btn btn-dark mr-2' onClick={() => {coinToss(0)}}>Heads</button>
                <button className='btn btn-dark ml-2' onClick={() => {coinToss(1)}}>Tails</button>
            </div>
            
        </div>
    )
}

export default Coinflip;