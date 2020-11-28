import React, {useState} from 'react';
import { Chart } from 'react-charts';
// Still need to add graphing capabiliity, coin system, and the input for the amount 
// of coins. Also need to style the application

const Crash = () => {
    const [userBet, setUserBet] = useState(0);
    const [finalMultiplier, setFinalMultiplier] = useState(0);

    const getPlots = () => {

    }

    const createRandomNumbers = () => {
        let arr = [];
        for (let i = 0; i < 50; i++) {
            let random1 = Math.random() * 2 + 1;
            random1 = random1.toFixed(2);
            arr.push(random1);

            let random2 = Math.random() * 5 + 1;
            random2 = random2.toFixed(2);

            let result = random1 * random2;
            arr.push(result.toFixed(2));
        }
        let randomNum = Math.floor(Math.random() * 100);
        let selected = arr[randomNum];
        
        return selected;
    }

    /*const data = React.useMemo(
        () => [
            {
                data: getPlots(),
              },
        ],
        []
    );

    const chartAxes = React.useMemo(
        () => [
            {primary: true, type: 'linear', position: 'bottom'},
            {type: 'linear', position: 'left'},
        ]
    )*/

    const play = (event) => {
        event.preventDefault();
        console.log(userBet)
        decideGame(userBet); 
    }

    const handleChange = (event) => {
        setUserBet(event.target.value);
    }

    const decideGame = (usersPick) => {
        let multiplier = createRandomNumbers();
        console.log('Multiplier: ' + multiplier);
        setFinalMultiplier(multiplier);
        if (usersPick <= multiplier) {
            setTimeout(alert('You win ' + usersPick + 'x coins'), 100);
        }
        else {
            setTimeout(alert('Better Luck next time'), 100);
        }
    }

    return (
        <div>
            <h1>Crash</h1>
            <h2>Final Multiplier {finalMultiplier}</h2>
            <form onSubmit={play}>

                <input type='number' step='any' min='1.5' placeholder='Min bet 1.5x' onChange={handleChange}></input>
                <input type='submit' value='Place'></input>
            </form>
        </div>
    )
}

export default Crash