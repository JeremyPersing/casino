import React, { Component } from 'react'
import ReactDice from 'react-dice-complete';
import 'react-dice-complete/dist/react-dice-complete.css';
import Nav from './Nav';
import Axios from 'axios';

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
        document.getElementById('betForm').style = 'visibility: hidden';
        // Deduct current bet from current amount of coins
        let currCoins = this.props.coins - this.props.wager;
        
        Axios.put('http://localhost:5000/user', {
            userName: this.props.usersName,
            coins: currCoins
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

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
        document.getElementById('betForm').style = 'visibility: visible';
        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome1(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a single number bet
    determineOutcome1(rolledNum, guessedNum) {
        if (rolledNum === guessedNum) {
            let endResult = this.props.coins + (this.props.wager * 12);
            this.props.setCoins(endResult)

            Axios.put('http://localhost:5000/user', {
            userName: this.props.usersName,
            coins: endResult
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    // Compares when the player made a 50/50 bet 
    compareTwoTimes(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betForm').style = 'visibility: visible';

        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome2(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome on a 50/50 bet
    determineOutcome2(rolledNum, guessedNum) {
        if ((rolledNum <= 6 && guessedNum === 6) || (rolledNum >= 7 && guessedNum === 7)) {
            let endResult = this.props.coins + (this.props.wager * 2);
            this.props.setCoins(endResult);

            Axios.put('http://localhost:5000/user', {
            userName: this.props.usersName,
            coins: endResult
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        
    }

    // Compares when the player made a 1/4 bet
    compareFourTimes(num) {
        // Make play buttons invisible and make bet button visible
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('betForm').style = 'visibility: visible';

        this.rollAll();
        // Set the timeout to allow for the rolledNum state to be set
        setTimeout(() => {this.determineOutcome3(this.state.rolledNum, num)}, 1000);
    }

    // Determines the outcome for a 4x bet
    determineOutcome3(rolledNum, guessedNum) {
        let endResult = this.props.coins;

        if (rolledNum <= 3 && guessedNum === 3) {
            console.log('between 1 and 3');
            endResult = this.props.coins + (this.props.wager * 4);
            this.props.setCoins(endResult);
        }
        else if ((rolledNum >= 4 && rolledNum <= 6) && guessedNum === 6) {
            console.log('between 4 and 6');
            endResult = this.props.coins + (this.props.wager * 4);
            this.props.setCoins(endResult);
        }
        else if ((rolledNum >= 7 && rolledNum <= 9) && guessedNum === 9) {
            console.log('between 7 and 9');
            endResult = this.props.coins + (this.props.wager * 4);
            this.props.setCoins(endResult);
        }
        else if (rolledNum >= 10 && guessedNum === 10) {
            console.log('between 10 and 12');
            endResult = this.props.coins + (this.props.wager * 4);
            this.props.setCoins(endResult);
        }

        Axios.put('http://localhost:5000/user', {
            userName: this.props.usersName,
            coins: endResult
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (  
          <div>
            <Nav coins={this.props.coins} usersName={this.props.usersName} setUsersName={this.props.setUsersName}/>
            <h1>Dice Roll</h1>
            <ReactDice
              numDice={2}
              defaultRoll={3}
              outline={true}
              faceColor={'#BDBCBD'}
              dotColor={'#333333'}
              dieSize={120}
              margin={40}
              rollDone={this.rollDoneCallback}
              ref={dice => this.reactDice = dice}
              disableIndividual={true}
              rollTime={1}
            />
            <form className='form-group' onSubmit={this.play}>
                <div id='betForm'>
                    <div className='bet-input'>
                        <label className='font-weight-bold' htmlFor='bet'>Bet</label>
                        <input className='form-control' name='bet' type='number' step='.01' min='.01' max={this.props.coins} onChange={this.handleWagerChange}></input>
                    </div>
                    <input className='btn btn-dark pl-3 pr-3 mt-2' type='submit' value='Place Bet'></input>
                </div>
            </form>
            <div className='container' id='buttonsDiv' style={{visibility:'hidden'}}>
                <div className='pt-2 pb-3 mb-2'>
                    <p className='font-weight-bold'>12x Multiplier</p>
                    <div className='row mb-1'>
                        <button className='col-2 offset-2 btn btn-dark' onClick={() => {this.compareSingle(1)}}>1</button>
                        <button className='col-2 btn btn-dark ml-1 mr-1' onClick={() => {this.compareSingle(2)}}>2</button>
                        <button className='col-2 btn btn-dark mr-1' onClick={() => {this.compareSingle(3)}}>3</button>
                        <button className='col-2 btn btn-dark' onClick={() => {this.compareSingle(4)}}>4</button>
                    </div>
                    <div className='row mb-1'>
                        <button className='col-2 offset-2 btn btn-dark' onClick={() => {this.compareSingle(5)}}>5</button>
                        <button className='col-2 btn btn-dark ml-1 mr-1' onClick={() => {this.compareSingle(6)}}>6</button>
                        <button className='col-2 btn btn-dark mr-1' onClick={() => {this.compareSingle(7)}}>7</button>
                        <button className='col-2 btn btn-dark' onClick={() => {this.compareSingle(8)}}>8</button>
                    </div>
                    <div className='row'>
                        <button className='col-2 offset-2 btn btn-dark' onClick={() => {this.compareSingle(9)}}>9</button>
                        <button className='col-2 btn btn-dark ml-1 mr-1' onClick={() => {this.compareSingle(10)}}>10</button>
                        <button className='col-2 btn btn-dark mr-1' onClick={() => {this.compareSingle(11)}}>11</button>
                        <button className='col-2 btn btn-dark' onClick={() => {this.compareSingle(12)}}>12</button>
                    </div>
                </div>
                <div className='pt-2 pb-3 mb-2'>
                    <p className='font-weight-bold'>4x Multiplier</p>
                    <div className='row'>
                        <button className='col-2 offset-2 btn btn-dark' onClick ={() => {this.compareFourTimes(3)}}>1 - 3</button>
                        <button className='col-2 btn btn-dark ml-1 mr-1' onClick ={() => {this.compareFourTimes(6)}}> 4 - 6</button>
                        <button className='col-2 btn btn-dark mr-1' onClick ={() => {this.compareFourTimes(9)}}>7 - 9</button>
                        <button className='col-2 btn btn-dark' onClick ={() => {this.compareFourTimes(10)}}>10 - 12</button>
                    </div>
                </div>
                <div className='pt-2 pb-3'>
                    <p className='font-weight-bold'>2x Multiplier</p>
                    <div className='row'>
                        <button className='col-4 offset-2 btn btn-dark' onClick={() => {this.compareTwoTimes(6)}}>6 or lower</button>
                        <button className='col-4 btn btn-dark ml-2' onClick={() => {this.compareTwoTimes(7)}}>7 or higher</button>
                    </div>
                </div>
            </div>
          </div>
        )
      }
}



export default Dice;