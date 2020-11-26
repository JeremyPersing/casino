import React, {useEffect, useState} from 'react';


const Blackjack = () => {
    //const [userCards, setUserCards] = useState([]);
    const [userTotal, setUserTotal] = useState(0);
    const [compTotal, setCompTotal] = useState(0);
    const [userCardArr, setUserCardArr] = useState([]);


    const play = () => {
        let playButton = document.getElementById('playBlackjack');
        playButton.remove();  // Remove the play button
        
    }

    // Funciton that returns a random value between 1-10
    const randomCard = () => {
        let num = Math.floor(Math.random() * 10 + 1);
        return num;
    }

    // Function that deals the first two cards for the player

    

    // Function that adds one more cards to the player's total
    const hit = () => {
        setUserCardArr(arr => [...arr, 2]);
        console.log(userCardArr)
        let total = determineTotal(userCardArr);
        setUserTotal(total);
    }

    // Function that ends the game and reveals the dealer's total
    const stand = () => {
        dealerTotal(); // Determine the dealer's total
    }

    // Function that determines the value of the cards
    const determineTotal = (arr) => {
        let total = 0;  // Return variable
        
         // Make a copy of the array
        console.log('Array before sort: ' + arr);
        // Order the array in decending order
        // We need to know the value of prior cards to determine
        // if the ace should be 1 or 11
        arr.sort(function(a, b){return b - a});
        console.log('Arr after sort' + arr)
        // Go through the array to see if there are any aces (1)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 1 && total <= 10) {
                arr[i] = 11; // Make the ace an 11 if the prior cards add up to 10 or less
            }
            total += arr[i]; // add the cards values together
        }
        console.log('Total: ' + total);
        return total;
    } 

    const dealerTotal = () => {
        let dCards = [];
        let cardOne = randomCard();
        let cardTwo = randomCard();
        dCards.push(cardOne);
        dCards.push(cardTwo);
        let dTotal = determineTotal(dCards);
        

        while (dTotal < 17) {
            let hit = randomCard();
            dCards.push(hit);
            dTotal = determineTotal(dCards);
        }

        setCompTotal(dTotal);

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