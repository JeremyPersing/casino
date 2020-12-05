import React, {useState} from 'react';
import { Wheel } from 'react-custom-roulette';

const Roulette = (props) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);


    const play = (event) => {
        // Doesn't reload page
        event.preventDefault();
        document.getElementById('buttonsDiv').style = 'visibility: visible';
        document.getElementById('betForm').style = 'visibility: hidden';
        // Deduct the amount of coins wagered from the total amount of coins
        let currCoins = props.coins - props.wager;
        props.setCoins(currCoins);
    }
    
    const handleWagerChange = (event) => {
        props.setWager(event.target.value);
    }
    
    const data = [
        { option: '0', style: { backgroundColor: 'Green', textColor: 'white'}},
        { option: '32', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '15', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '19', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '4', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '21', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '2', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '25', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '17', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '34', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '6', style: { backgroundColor: 'Black', textColor: 'white'}},
        
        { option: '27', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '13', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '35', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '11', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '30', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '8', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '23', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '10', style: { backgroundColor: 'Black', textColor: 'white'}},

        { option: '5', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '24', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '16', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '33', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '1', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '20', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '14', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '31', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '9', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '22', style: { backgroundColor: 'Black', textColor: 'white'}},
        
        { option: '18', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '29', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '7', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '28', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '12', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '35', style: { backgroundColor: 'Black', textColor: 'white'}},
        { option: '3', style: { backgroundColor: 'Red', textColor: 'white'}},
        { option: '26', style: { backgroundColor: 'Black', textColor: 'white'}},
    ]

    // Determines the outome and displays the amount won
    const determineOutcome = (winningColor, userPick) => {
        winningColor = winningColor.toUpperCase()
        userPick = userPick.toUpperCase();
        
        if (userPick === winningColor) {
            // Green multiplier = x13
            if (winningColor === 'GREEN') {
                setTimeout(() => {props.setCoins(props.coins + (props.wager * 13))}, 11250);
            }
            // Red and black multiplier = x2
            else {
                setTimeout(() => {props.setCoins(props.coins + (props.wager * 2))}, 11250);
            }
        }
    }

    

    const handleSpinClick = (event) => {
        // Only allow a spin if the wheel is not currently spinning
        if (mustSpin === false) {
            document.getElementById('buttonsDiv').style = 'visibility: hidden';
            document.getElementById('betForm').style = 'visibility: visible';
            // Assign the user's color pick to bet state 
            let userPick = event.target.value;

            // Generate a random number between 0 and 36
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            // Set the new prize number
            setPrizeNumber(newPrizeNumber);
            // Set the new prize color
            let color = data[newPrizeNumber].style.backgroundColor;
            
            // Determine the outcome of the spin
            determineOutcome(color, userPick);
            
            setMustSpin(true);
        }
    }

    return(
        <div>
            <h1>Roulette</h1>
            <div className='mt-4 mb-2'>
                <Wheel
                class='mx-auto'
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={() => {
                    setMustSpin(false);
                }}
                ></Wheel>
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
                <button value='Red' className='btn btn-danger ml-2 mr-2' onClick={handleSpinClick}>Red (x2)</button>
                <button value='Black' className='btn btn-dark  mr-2' onClick={handleSpinClick}>Black (x2)</button>
                <button value='Green' className='btn btn-success' onClick={handleSpinClick}>Green (x13)</button>
            </div>
        </div>
    )
}

export default Roulette;