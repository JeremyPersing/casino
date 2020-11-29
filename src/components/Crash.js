import React, {useState} from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_dataviz from '@amcharts/amcharts4/themes/dataviz';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// Still need to add graphing capabiliity, coin system, and the input for the amount 
// of coins. Also need to style the application

const Crash = () => {
    const [userBet, setUserBet] = useState(0);
    const [finalMultiplier, setFinalMultiplier] = useState();

    // Creates the round's ending multiplication factor 
    const createRandomNumbers = () => {
        let arr = [];
        for (let i = 0; i < 50; i++) {
            let random1 = Math.random() * 2 + 1;
            
            arr.push(random1);

            let random2 = Math.random() * 5 + 1;
            

            let result = random1 * random2;
            arr.push(result);
        }

        let randomNum = Math.floor(Math.random() * 100);
        let selected = arr[randomNum];

        return selected;
    }

    // Called when the place button is hit
    const play = (event) => {
        // Doesn't reload page
        event.preventDefault();
        // Gets a random number
        let random = createRandomNumbers();
        console.log('Multiplier: ' + random);
        // Load the chart
        createChart(random);
        decideGame(userBet, random); 
        
    }

    // Function that get's the user's bet from the input
    const handleChange = (event) => {
        setUserBet(event.target.value);
    }

    // Takes in the user's bet and the actual multiplier
    // Then decides if the user won or lost
    const decideGame = (usersPick, randomMultiplier) => {
        randomMultiplier = randomMultiplier.toFixed(2);
        setTimeout(() => {setFinalMultiplier(randomMultiplier)}, 1500);
        if (usersPick <= randomMultiplier) {
            setTimeout(() => {alert('You win ' + usersPick + 'x coins')}, 2000);
        }
        else {
            setTimeout(() => {alert('Better Luck next time')}, 2000);
        }
    }

    // Function that creates the angular chart
    function createChart(multFactor) {
        // Themes
        am4core.useTheme(am4themes_dataviz);
        am4core.useTheme(am4themes_animated);

        // Create chart
        let chart = am4core.create('chartdiv', am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // Initial fade in

        chart.innerRadius = -25;

        let axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 15;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new 
        am4core.InterfaceColorSet().getFor('background');
        axis.renderer.grid.template.strokeOpacity = .3;

        let colorSet = new am4core.ColorSet();

        let range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 5;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = colorSet.getIndex(0);
        range0.axisFill.zIndex = -1;

        let range1 = axis.axisRanges.create();
        range1.value = 5;
        range1.endValue = 10;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = colorSet.getIndex(2);
        range1.axisFill.zIndex = -1;

        let range2 = axis.axisRanges.create();
        range2.value = 10;
        range2.endValue = 15;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = colorSet.getIndex(4);
        range2.axisFill.zIndex = -1;

        let hand = chart.hands.push(new am4charts.ClockHand());

        chart.setTimeout(randomValue, 800)

        console.log('Mult factor in create chart ' + multFactor);
        function randomValue() {
            console.log('Random num ' + multFactor);
            hand.showValue(multFactor, 1000, am4core.ease.cubicOut);
        }
    }

    
    return (
        <div>
            <h1>Crash</h1>
            <h2>Final Multiplier {finalMultiplier}</h2>
            <div id="chartdiv" style={{width: '100%', height: '500px'}}></div>
            <form onSubmit={play}>
                <input type='number' step='any' min='1.5' required placeholder='Min bet 1.5x' onChange={handleChange}></input>
                <input type='submit' value='Place'></input>
            </form>
        </div>
    )
}

export default Crash