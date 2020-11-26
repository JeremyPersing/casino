import React, {useState} from 'react';


const Blackjack = () => {
    //const [userCards, setUserCards] = useState([]);
    const [userTotal, setUserTotal] = useState(0);
    const [compTotal, setCompTotal] = useState(0);
    const [userCardArr, setUserCardArr] = useState([]);


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
    }
    

    // Function that adds one more cards to the player's total
    const hit = () => {
        if (userTotal < 21) {
            // Deal another card
            let card = randomCard();

            // Place the card in the user's card array
            setUserCardArr(arr => [...arr, card]);
            
            // Create a clone of the user's card array and push the new card into it
            let arr = [...userCardArr];
            arr.push(card);

            // Get the user's new total
            let total = determineTotal(arr);
            setUserTotal(total);
        }
        else if (userTotal === 21) {
            dealerTotal();
        }
        else {
            alert('You Bust');
        }

    }

    // Function that ends the game and reveals the dealer's total
    const stand = () => {
        dealerTotal(); // Determine the dealer's total
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

    const dealerTotal = () => {
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
        
        setTimeout(() => {compareTotals(dTotal)}, 1000);
    }

    const compareTotals = (dealerTotal) => {
        console.log('User Total: ' + userTotal);
        console.log('Comp Total: ' + dealerTotal);
        // The user has 21 and the dealer does not
        if (userTotal === 21 && dealerTotal !== 21) {
            alert('You won');
        }
        // Both the user and dealer have the same total
        else if (userTotal === dealerTotal) {
            alert('Tie');
        }
        // The user busted
        else if (userTotal > 21) {
            alert('You lost');
        }
        // The user has a total under 21 and a higher total than the dealer
        else if (userTotal < 21 && userTotal > dealerTotal) {
            alert('You won');
        }
        // The user has a total under 21 and a lower total than the dealer
        else if (dealerTotal <= 21 && userTotal < dealerTotal) {
            alert('You Lost');
        }
        // The user did not bust but the dealer did
        else if (userTotal < 21 && dealerTotal > 21) {
            alert('You won');
        }
    }

    return (
        <div>
            <h1>Blackjack</h1>
            <h4>Your total: {userTotal}</h4>
            <h4>User cards: {userCardArr}</h4>
            <h4>Dealer's Hand: {compTotal}</h4>
            <button id='playBlackjack' onClick={play}>Play</button>
            <button id='hitButton' onClick={hit}>Hit</button>
            <button id='stand' onClick={stand}>Stand</button>
        </div>
    )
}

export default Blackjack;