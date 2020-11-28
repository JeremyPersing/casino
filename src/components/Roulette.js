import React, {useState} from 'react';


const Roulette = () => {
    const [multiplier, setMultiplier] = useState();
    const [winner, setWinner] = useState();
    const [betState, setBetState] = useState();

    const handleClick = (event) => {
        let userPick = event.target.value;
        setBetState(userPick); 
        
        
        if (userPick === 'Red' || userPick === 'Black') {
            setMultiplier(2);
        }
        else {
            setMultiplier(13)
        }
        let winningColor = play();
        setWinner(winningColor);
        determineOutcome(winningColor, userPick);
    }

    const play = () => {
        let number = spin();

        if (number === 37) {
            return 'Green'
        }
        // Aby number under 37 is either red of black
        else if (number <= 36) {
            // Even is red
            if ((number % 2) === 0) {
                return 'Red';   
            }
            // Odd is black
            else {
                return 'Black';
            }
        }
        
    }

    const spin = () => {
        let arr = [];
        for (let i = 1; i < 38; i++) {
            arr[i] = i;
        }
        let randomNum = Math.floor(Math.random() * 37 + 1);

        return arr[randomNum];
    }

    const determineOutcome = (winningColor, userPick) => {
        
        if (userPick === winningColor) {
            if (winningColor === 'Green') {
                console.log('You won 13x');
            }
            else {
                console.log('You won 2x')
            }
        }
        else {
            console.log('lost');
        }
    }


    return(
        <div>
            <h1>Roulette</h1>
            <p>Your Color: {betState}</p>
            <p>Multiplier: {multiplier}</p>
            <p>Winning Color: {winner}</p>
            <button value='Red' onClick={handleClick}>Red (x2)</button>
            <button value='Black' onClick={handleClick}>Black (x2)</button>
            <button value='Green' onClick={handleClick}>Green (x13)</button>
        </div>
    )
}

export default Roulette;