const Coinflip = () => {
    const flipCoin = () => {
        let randomNumber = Math.floor(Math.random() * 2);
        console.log(randomNumber);
        return randomNumber;
    }

    const outcome = (int) => {
        // 0 is heads and 1 is tails
        let flip = flipCoin();
        if (int === flip) {
            console.log('winner');
        }
        else {
            console.log('Better luck next time')
        }
    }

    return (
        <div>
            <h1>Pick One</h1>
            <p>Double or nothing</p>
            <button onClick={() => {outcome(0)}}>Heads</button>
            <button onClick={() => {outcome(1)}}>Tails</button>
        </div>
    )
}

export default Coinflip;