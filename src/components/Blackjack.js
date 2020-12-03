import React, {useState} from 'react';


const Blackjack = (props) => {
    const [userTotal, setUserTotal] = useState(0);  // Used to hold and display user's total
    const [compTotal, setCompTotal] = useState(0);  // Used to hold and display comp's total
    const [userCardArr, setUserCardArr] = useState([]);  // Holds the user's card values
    const suits = ['C', 'D', 'H', 'S']; // Array for the suits of cards
    const tens = ['10', 'J', 'Q', 'K']; // Array for cards that hold a value of 10

    const play = (event) => {
        // Doesn't reload page
        event.preventDefault();
        document.getElementById('playBlackjack').style = 'visibility: visible';
        document.getElementById('betButton').style = 'visibility: hidden';
        
        // Deduct the amount of coins wagered from the total amount of coins
        let currCoins = props.coins - props.wager;
        props.setCoins(currCoins);
    }

    const handleWagerChange = (event) => {
        props.setWager(event.target.value);
    }

    const playBlackJack = () => {
        let playButton = document.getElementById('playBlackjack');
        // Remove the play button
        playButton.style = 'visibility: hidden'  
        // Display the Hit and Stand Buttons
        document.getElementById('hitAndStand').style = 'visibility: visible';
        initialDeal();
    }

    // Funciton that returns a random value between 1-10
    const randomCard = () => {
        let num = Math.floor(Math.random() * 10 + 1);
        return num;
    }

    // Function that deals the first two cards for the player
    const initialDeal = () => {
        // Deal two cards
        let cardOne = randomCard();
        placePlayerCards('player', cardOne);
        let cardTwo = randomCard();
        placePlayerCards('player', cardTwo);

        // Create a new array and push the cards into them
        let arr = [];
        arr.push(cardOne);
        arr.push(cardTwo);

        // Store the cards in the user's cards array
        setUserCardArr(oldArr => [...oldArr, cardOne]);
        setUserCardArr(oldArr => [...oldArr, cardTwo]);

        // Get the total player's current total
        let total = determineTotal(arr);
        setUserTotal(total);
        if (total === 21) {
            setTimeout(() => {dealerTotal(total)}, 200);
        }
    }
    

    // Function that adds one more cards to the player's total
    const hit = () => {
        // Deal another card
        let card = randomCard();
        placePlayerCards('player', card);

        
        // Place the card in the user's card array
        setUserCardArr(arr => [...arr, card]);
            
        // Create a clone of the user's card array and push the new card into it
        let arr = [...userCardArr];
        arr.push(card);

        // Get the user's new total
        let total = determineTotal(arr);
        setUserTotal(total);
        
        // Account for if that new card will equal 21 or be over it
        setTimeout(() => {
            if (total === 21) {
                dealerTotal(total);
            }
            else if (total > 21) {
                setTimeout(() => {
                    setTimeout(() => {playAgain()}, 1000);
                }, 100);
            }
        }, 100)
    }

    // Function that ends the game and reveals the dealer's total
    const stand = () => {
        dealerTotal(userTotal); // Determine the dealer's total
    }

    // Function that determines the value of the cards
    const determineTotal = (arr) => {
        let total = 0;  // Return variable
        
        // Order the array in decending order
        // We need to know the value of prior cards to determine
        // if the ace should be 1 or 11
        arr.sort(function(a, b){return b - a});
        
        // Go through the array to see if there are any aces (1)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1 && total <= 10) {
                arr[i] = 11; // Make the ace an 11 if the prior cards add up to 10 or less
            }
            total += arr[i]; // add the cards values together
        }

        return total;
    } 

    const dealerTotal = (playerTotal) => {
        // The dealer must deal themself two cards
        let dCards = [];
        let cardOne = randomCard();
        placePlayerCards('dealer', cardOne)
        let cardTwo = randomCard();
        placePlayerCards('dealer', cardTwo);
        dCards.push(cardOne);
        dCards.push(cardTwo);
        let dTotal = determineTotal(dCards);
            
        // The dealer will only hit if the player has not busted
        if (userTotal <= 21) {
            // The dealer will hit only if there total is less than 17
            while (dTotal < 17) {
                let hit = randomCard();
                placePlayerCards('dealer', hit);
                dCards.push(hit);
                dTotal = determineTotal(dCards);
            }
        }
        setCompTotal(dTotal);
        
        setTimeout(() => {compareTotals(playerTotal, dTotal)}, 100);
    }

    const compareTotals = (playerTotal, dealerTotal) => {
        // The user has 21 and the dealer does not
        if (playerTotal === 21 && dealerTotal !== 21) {
            props.setCoins(props.coins + (props.wager * 2.5));
        }
        // Both the user and dealer have the same total
        else if (playerTotal === dealerTotal) {
            // Need to multiply by 1 otherwise js will read wager as a string and concatenate both
            props.setCoins(props.coins + (props.wager * 1));
        }
        // The user has a total under 21 and a higher total than the dealer
        else if (playerTotal < 21 && playerTotal > dealerTotal) {
            props.setCoins(props.coins + (props.wager * 2));
        }
        // The user did not bust but the dealer did
        else if (playerTotal < 21 && dealerTotal > 21) {
            props.setCoins(props.coins + (props.wager * 2));
        }
        setTimeout(() => {playAgain()}, 2000);
    }

    const playAgain = () => {
        document.getElementById('betButton').style = 'visibility: visible';
        document.getElementById('buttonsDiv').style = 'visibility: hidden';
        document.getElementById('hitAndStand').style = 'visibility: hidden';
        setUserTotal(0);  // Set user total to 0 for replays
        setCompTotal(0);  // Set comp total to 0 for replays
        setUserCardArr([]); // set users card to empty for replays
        removeCards(); // Remove the current cards
    }

    // Places the cards onto the screen
    // player argument should either be player or dealer
    const placePlayerCards = (player, num) => {

        // Get the suit of the card
        let random = Math.floor(Math.random() * 4);
        let cardSuit = suits[random];

        // If num is ten it can be 10, J, Q, or K
        if (num === 10) {
            num = tens[random];
        }

        // Place the card in the playing area
        let cardDiv = document.getElementById(player + 'Cards');
        cardDiv.innerHTML += `<img src=${process.env.PUBLIC_URL + '/images/Cards/' + num  + cardSuit + '.png'} height='200px' alt=${num}></img>`
    }

    const removeCards = () => {
        let playerCardDiv = document.getElementById('playerCards');
        while (playerCardDiv.childNodes.length > 0) {
            let currChildElement = playerCardDiv.childNodes[playerCardDiv.childNodes.length - 1];
            playerCardDiv.removeChild(currChildElement);
        }
        let dealerCardDiv = document.getElementById('dealerCards');
        while (dealerCardDiv.childNodes.length > 0) {
            let currChildElement = dealerCardDiv.childNodes[dealerCardDiv.childNodes.length - 1];
            dealerCardDiv.removeChild(currChildElement);
        }
    }


    return (
        <div>
            <h1>Blackjack</h1>
            <form onSubmit={play}>
                <div>
                    <label>Bet</label>
                    <input type='number'step='.01' min={.01} max={props.coins} required onChange={handleWagerChange} id='wager'></input>
                </div>
                <input id='betButton' type='submit' value='Place Bet'></input>
            </form>
            <div id='buttonsDiv' style={{visibility: 'hidden'}}>
                <button id='playBlackjack' onClick={playBlackJack}>Play</button>
                <div id='hitAndStand' style={{visibility: 'hidden'}}>
                    <button id='hitButton' onClick={hit}>Hit</button>
                    <button id='stand' onClick={stand}>Stand</button>
                </div>
            </div>
            <div>
                <h4>Your total: {userTotal}</h4>
                <h2>Your Hand</h2>
                <div id='playerCards'></div>
            </div>
            <div>
                <h4>Dealer's Total: {compTotal}</h4>
                <h2>Dealer's Hand</h2>
                <div id='dealerCards'></div>
            </div>
    
        </div>
    )
}

export default Blackjack;