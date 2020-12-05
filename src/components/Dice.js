import React, { Component } from 'react'
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';

class Dice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rolledNum: ''
        }
        // Binding methods
        this.rollAll = this.rollAll.bind(this)
        this.compareSingle = this.compareSingle.bind(this);
        this.rollDoneCallback = this.rollDoneCallback.bind(this);
        this.compareTwoTimes = this.compareTwoTimes.bind(this);
        this.handleWagerChange = this.handleWagerChange.bind(this);
        this.play = this.play.bind(this);
    }

    handleWagerChange(event) {
        this.props.setWager(event.target.value);
    }

    play(event) {
        event.preventDefault();
        // Make play buttons visible and make bet button invisible
        document.getElementById('buttonsDiv').style = 'visibility: visible';
        document.getElementById('betButton').style = 'visibility: hidden';
        // Deduct current bet from current amount of coins
        let currCoins = this.props.coins - this.props.wager;
        this.props.setCoins(currCoins);
    }

    // Rolls the dice
    rollAll() {
        this.reactDice.rollAll()
    }
    
    // Sets the rolled number once the dice is done spinning
    rollDoneCallback(num) {
        this.setState({rolledNum: num});
        console.log(num)
    }

    // Compares when the player made a bet on a single number
    compareSingle(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betButton').style = 'visibility: visible';
        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome1(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a single number bet
    determineOutcome1(rolledNum, guessedNum) {
        if (rolledNum === guessedNum) {
            this.props.setCoins(this.props.coins + (this.props.wager * 12))
        }
    }

    // Compares when the player made a 50/50 bet 
    compareTwoTimes(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betButton').style = 'visibility: visible';

        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome2(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a 50/50 bet
    determineOutcome2(rolledNum, guessedNum) {
        if ((rolledNum <= 6 && guessedNum === 6) || (rolledNum >= 7 && guessedNum === 7)) {
            this.props.setCoins(this.props.coins + (this.props.wager * 2))
        }
        
    }

    // Compares when the player made a 1/4 bet
    compareFourTimes(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betButton').style = 'visibility: visible';

        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome3(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome for a 4x bet
    determineOutcome3(rolledNum, guessedNum) {
        if (rolledNum <= 3 && guessedNum === 3) {
            this.props.setCoins(this.props.coins + (this.props.wager * 4));
        }
        else if ((rolledNum >= 4 || rolledNum <= 6) && guessedNum === 6) {
            this.props.setCoins(this.props.coins + (this.props.wager * 4));
        }
        else if ((rolledNum >= 7 || rolledNum <= 9) && guessedNum === 9) {
            this.props.setCoins(this.props.coins + (this.props.wager * 4));
        }
        else if (rolledNum >= 10 && guessedNum === 10) {
            this.props.setCoins(this.props.coins + (this.props.wager * 4));
        }
    }

    render() {
        return (
          <div>
            <ReactDice
              numDice={2}
              defaultRoll={3}
              outline={true}
              faceColor={'#BDBCBD'}
              dotColor={'#333333'}
              dieSize={120}
              rollDone={this.rollDoneCallback}
              ref={dice => this.reactDice = dice}
              disableIndividual={true}
              rollTime={1}
            />
            <form onSubmit={this.play}>
                <label>Bet</label>
                <input type='number' step='.01' min='.01' max={this.props.coins} onChange={this.handleWagerChange}></input>
                <input id='betButton' type='submit' value='Place Bet'></input>
            </form>
            <div id='buttonsDiv' style={{visibility:'hidden'}}>
                <button onClick={() => {this.compareSingle(1)}}>1</button>
                <button onClick={() => {this.compareSingle(2)}}>2</button>
                <button onClick={() => {this.compareSingle(3)}}>3</button>
                <button onClick={() => {this.compareSingle(4)}}>4</button>
                <button onClick={() => {this.compareSingle(5)}}>5</button>
                <button onClick={() => {this.compareSingle(6)}}>6</button>
                <button onClick={() => {this.compareSingle(7)}}>7</button>
                <button onClick={() => {this.compareSingle(8)}}>8</button>
                <button onClick={() => {this.compareSingle(9)}}>9</button>
                <button onClick={() => {this.compareSingle(10)}}>10</button>
                <button onClick={() => {this.compareSingle(11)}}>11</button>
                <button onClick={() => {this.compareSingle(12)}}>12</button>
                <button onClick ={() => {this.compareFourTimes(3)}}>1 - 3</button>
                <button onClick ={() => {this.compareFourTimes(6)}}> 4 - 6</button>
                <button onClick ={() => {this.compareFourTimes(9)}}>7 - 9</button>
                <button onClick ={() => {this.compareFourTimes(10)}}>10 - 12</button>
                <button onClick={() => {this.compareTwoTimes(6)}}>6 or lower</button>
                <button onClick={() => {this.compareTwoTimes(7)}}>7 or higher</button>

            </div>
          </div>
        )
      }
}



export default Dice;