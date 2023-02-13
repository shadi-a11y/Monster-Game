let yourHealth = document.querySelector(".your-health");
let monsterHealth = document.querySelector(".monster-health");
let buttons = document.querySelector(".buttons");
let result = document.querySelector(".battle-log");
let section = document.querySelector(".section");
let battleLog = [];
let healCount = 0;

const attack = document.querySelector(".attack");
const specialAttack = document.querySelector(".special-attack");
const heal = document.querySelector(".heal");
const giveUp = document.querySelector(".give-up");
const resultSection = document.createElement("div");
resultSection.className = "result-section";
const h1 = document.createElement("h1");
h1.textContent = "Game Over!";
const h3 = document.createElement("h3");
const button = document.createElement("button");
button.className = "new btn";
button.textContent = "New Game";
resultSection.appendChild(h1);
resultSection.appendChild(h3);
resultSection.appendChild(button);

function end(whoWon){    
    h3.textContent = whoWon;
    document.body.appendChild(resultSection);
}

function printBattleLog() {
    result.innerHTML = battleLog;
}

function removeBattleLog() {
    result.innerHTML = "";
}

function restart() {
    monsterHealth.value = 100;
    yourHealth.value = 100;
    battleLog = [];
    document.body.appendChild(buttons);
}

function compare() {
    if((monsterHealth.value <= 0) || (yourHealth.value <= 0))
    {
        if(monsterHealth.value < yourHealth.value)
        {
            buttons.remove();
            end("You won!") 
            removeBattleLog();
        }
        else if(monsterHealth.value == yourHealth.value) {
            buttons.remove();
            end("It's a draw!")
            removeBattleLog();
        }
        else {
            buttons.remove();
            end("You lost :-(")
            removeBattleLog();
        }
    }
}

attack.addEventListener("click", function() {
    healCount--;
    let x1 = Math.floor(Math.random() * 101);;
    monsterHealth.value -= x1;
    let x2 = Math.floor(Math.random() * 101);;
    yourHealth.value -= x2;
    let output;
    output = `<div> <span class="monster-text">Monster </span> attacks and deals <span class="dealing">${x2}</span></div>`;
    battleLog.push(output);
    output = `<div> <span class="player-text">Player </span> attacks and deals <span class="dealing">${x1}</span></div>`;
    battleLog.push(output);
    printBattleLog();
    compare();
});

specialAttack.addEventListener("click", function() {
    if(yourHealth.value <= (monsterHealth.value - 20)) {
        healCount--;
        let x3 = Math.floor(Math.random() * 101);;
        monsterHealth.value -= x3;
        let x4 = Math.floor(x3 - x3/3);
        yourHealth.value -= x4;
        let output;
        output = `<div> <span class="monster-text">Monster </span> attacks and deals <span class="dealing">${x4}</span></div>`;
        battleLog.push(output);
        output = `<div> <span class="player-text">Player </span> attacks and deals <span class="dealing"${x3}</span></div>`;
        battleLog.push(output);
        printBattleLog();
        compare();
    } else {
        window.alert("You can not use the special attack right now!")
    }
});

heal.addEventListener("click", function() {
    let x5 = Math.floor(Math.random() * 101);;
    if((yourHealth.value + x5) < 100 && healCount < 3) {
        yourHealth.value += x5; 
        healCount++;
        let output = `<div> <span class="player-text">Player</span> heals himself for <span class="healing"> ${x5} </span></div>`;
        battleLog.push(output);
        printBattleLog();
    } else {
        window.alert("Try again!")
    }
});

giveUp.addEventListener("click", function() {
   buttons.remove();
   end("You lost....");
   removeBattleLog();
});

button.addEventListener("click", function() {
    restart();
    resultSection.remove();
})
