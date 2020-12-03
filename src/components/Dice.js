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
        this.compareBroad = this.compareBroad.bind(this);
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
            this.props.setCoins(this.props.coins + (this.props.wager * 6))
        }
    }

    // Compares when the player made a 50/50 bet 
    compareBroad(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betButton').style = 'visibility: visible';

        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome2(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a 50/50 bet
    determineOutcome2(rolledNum, guessedNum) {
        if ((rolledNum <= 3 && guessedNum === 3) || (rolledNum >= 4 && guessedNum === 4)) {
            this.props.setCoins(this.props.coins + (this.props.wager * 2))
        }
        
    }

    render() {
        return (
          <div>
            <ReactDice
              numDice={1}
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
                <button onClick={() => {this.compareBroad(3)}}>3 or lower</button>
                <button onClick={() => {this.compareBroad(4)}}>4 or higher</button>
            </div>
          </div>
        )
      }
}



export default Dice;