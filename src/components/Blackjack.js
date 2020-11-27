import React, {useState} from 'react';
import WagerPopup from './WagerPopup';


const Blackjack = () => {
    const [userTotal, setUserTotal] = useState(0);  // Used to hold and display user's total
    const [compTotal, setCompTotal] = useState(0);  // Used to hold and display comp's total
    const [userCardArr, setUserCardArr] = useState([]);  // Holds the user's card values


    const play = () => {
        let playButton = document.getElementById('playBlackjack');
        playButton.remove();  // Remove the play button
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
        let cardTwo = randomCard();

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
        console.log(userTotal + card);

        // Place the card in the user's card array
        setUserCardArr(arr => [...arr, card]);
            
        // Create a clone of the user's card array and push the new card into it
        let arr = [...userCardArr];
        arr.push(card);

        // Get the user's new total
        let total = determineTotal(arr);
        setUserTotal(total);

        
        // Account for if that new card will equal 21 or be over it
        if (userTotal + card === 21) {
            dealerTotal((userTotal + card));
        }
        else if (userTotal + card > 21) {
            setTimeout(() => {alert('You bust')}, 100);
        }
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
        let cardTwo = randomCard();
        dCards.push(cardOne);
        dCards.push(cardTwo);
        let dTotal = determineTotal(dCards);
            
        // The dealer will only hit if the player has not busted
        if (userTotal <= 21) {
            // The dealer will hit only if there total is less than 17
            while (dTotal < 17) {
                let hit = randomCard();
                dCards.push(hit);
                dTotal = determineTotal(dCards);
            }
        }
        setCompTotal(dTotal);
        
        setTimeout(() => {compareTotals(playerTotal, dTotal)}, 100);
    }

    const compareTotals = (playerTotal, dealerTotal) => {
        console.log('User Total: ' + playerTotal);
        console.log('Comp Total: ' + dealerTotal);
        // The user has 21 and the dealer does not
        if (playerTotal === 21 && dealerTotal !== 21) {
            alert('You won user has 21 and the dealer does not');
        }
        // Both the user and dealer have the same total
        else if (playerTotal === dealerTotal) {
            alert('Tie');
        }
        // The user busted
        else if (playerTotal > 21) {
            alert('You lost user busted');
        }
        // The user has a total under 21 and a higher total than the dealer
        else if (playerTotal < 21 && playerTotal > dealerTotal) {
            alert('You won user has a total under 21 and a higher total than the dealer');
        }
        // The user has a total under 21 and a lower total than the dealer
        else if (dealerTotal <= 21 && playerTotal < dealerTotal) {
            alert('You Lost user has a total under 21 and a lower total than the dealer');
        }
        // The user did not bust but the dealer did
        else if (playerTotal < 21 && dealerTotal > 21) {
            alert('You won user did not bust but the dealer did');
        }
    }

    return (
        <div>
            <h1>Blackjack</h1>
            <h4>Your total: {userTotal}</h4>
            <h4>Dealer's Hand: {compTotal}</h4>
            <button id='playBlackjack' onClick={play}>Play</button>
            <button id='hitButton' onClick={hit}>Hit</button>
            <button id='stand' onClick={stand}>Stand</button>
        </div>
    )
}

export default Blackjack;