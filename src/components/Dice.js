const Dice = () => {
    // Function that generates a random number between 1 and 6
    const rollDice = () => {
        let roll = Math.floor(Math.random() * 6 + 1);
        console.log(roll);
        return roll;
    }

    // Function that compares players choice to the dice roll
    const outcome = (pick) => {
        console.log('Players pick: ' + pick);
        let diceRoll = rollDice();

        if (pick === diceRoll) {
            console.log('You won')
        }
        else {
            console.log('You Lost');
        }
    }

    // Function that gives the player a 50/50 chance
    const outcomeTwo = (pick) => {
        let diceRoll = rollDice();

        if (pick === 3 && diceRoll <= 3) {
            console.log('You Won');
        }
        else if (pick === 4 && diceRoll >= 4) {
            console.log('You Won');
        }
        else {
            console.log('You lost');
        }
    }

    return (
        <div>
            <h1>Dice Roll</h1>
            <button onClick={() => {outcome(1)}}>1</button>
            <button onClick={() => {outcome(2)}}>2</button>
            <button onClick={() => {outcome(3)}}>3</button>
            <button onClick={() => {outcome(4)}}>4</button>
            <button onClick={() => {outcome(5)}}>5</button>
            <button onClick={() => {outcome(6)}}>6</button>
            <button onClick={() => {outcomeTwo(3)}}>3 or lower</button>
            <button onClick={() => {outcomeTwo(4)}}>4 or higher</button>
        </div>
    )
}

export default Dice;