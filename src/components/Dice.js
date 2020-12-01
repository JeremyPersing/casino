import React, { Component } from 'react'
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import Wager from './Wager';

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
        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome1(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a single number bet
    determineOutcome1(rolledNum, guessedNum) {
        console.log('Guessed: ' + guessedNum);
        console.log('Rolled: ' + rolledNum);
        if (rolledNum === guessedNum) {
            console.log('You Win, x6 profit')
        }
        else {
            console.log('You lose');
        }
    }

    // Compares when the player made a 50/50 bet 
    compareBroad(num) {
        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome2(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a 50/50 bet
    determineOutcome2(rolledNum, guessedNum) {
        console.log("Rolled: " + rolledNum);
        console.log('Guessed: ' + guessedNum);
        if ((rolledNum <= 3 && guessedNum === 3) || (rolledNum >= 4 && guessedNum === 4)) {
            console.log('You win 2x')
        }
        else {
            console.log("You lose");
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
            <Wager coins={this.props.coins} setCoins={this.props.setCoins}
             wager={this.props.wager} setWager={this.props.setWagers}></Wager>
            <button onClick={() => {this.compareSingle(1)}}>1</button>
            <button onClick={() => {this.compareSingle(2)}}>2</button>
            <button onClick={() => {this.compareSingle(3)}}>3</button>
            <button onClick={() => {this.compareSingle(4)}}>4</button>
            <button onClick={() => {this.compareSingle(5)}}>5</button>
            <button onClick={() => {this.compareSingle(6)}}>6</button>
            <button onClick={() => {this.compareBroad(3)}}>3 or lower</button>
            <button onClick={() => {this.compareBroad(4)}}>4 or higher</button>
          </div>
        )
      }
}



export default Dice;