const select = (selector) => document.querySelector(selector);

let yourHealth = select(".your-health");
let monsterHealth = select(".monster-health");
let buttons = select(".buttons");
let battleLogSection = select(".battle-log");
let battleLog = [];
let healCount = 3;


const [attack, specialAttack, heal, giveUp] = document.querySelectorAll(".btn");

//Creating the result section
const resultSection = document.createElement("div");
resultSection.innerHTML = `
    <h1>Game Over!</h1>
    <h3></h3>
    <button class="new btn">New Game</button>
`;
resultSection.classList.add("result-section");


const end = (whoWon) => {
    resultSection.querySelector("h3").textContent = whoWon;
    document.body.appendChild(resultSection);
    const newGameButton = select('.new');
    newGameButton.addEventListener("click", () => {
    restart();
    resultSection.remove();
})
};

//Function to print the battle log
const printBattleLog = () => battleLogSection.innerHTML = battleLog.join("");

//Function to remove the battle log
const removeBattleLog = () => battleLogSection.innerHTML = "";

//Restart function that returns all values to their initial state
const restart = () => {
    monsterHealth.value = yourHealth.value = 100;
    battleLog = [];
    document.body.insertBefore(buttons, battleLogSection);
    healCount = 3;
};

//Function to compare healths of monster & player
const compare = () => {
    if (monsterHealth.value <= 0 || yourHealth.value <= 0) {
        if (monsterHealth.value < yourHealth.value) end("You won!");
        else if (monsterHealth.value == yourHealth.value) end("It's a draw!");
        else end("You lost :-(");
        buttons.remove();
        removeBattleLog();
    }
};

attack.addEventListener("click", () => {
    healCount = 3;
    const x1 = Math.floor(Math.random() * 40) + 1;
    const x2 = Math.floor(Math.random() * 40) + 1;
    monsterHealth.value -= x1;
    yourHealth.value -= x2;
    const output = `
        <div class="battle-log-text">
            <span class="monster-text">Monster </span> attacks and deals
            <span class="dealing">${x2}</span>
        </div>
        <div class="battle-log-text">
            <span class="player-text">Player </span> attacks and deals
            <span class="dealing">${x1}</span>
        </div>
    `;
    battleLog.push(output);
    printBattleLog();
    compare();
});

specialAttack.addEventListener("click", () => {
    if (yourHealth.value <= monsterHealth.value - 20) {
        healCount = 3;
        const x3 = Math.floor(Math.random() * 40) + 1;
        monsterHealth.value -= x3;
        const x4 = Math.floor(Math.random() * x3) + 1;
        yourHealth.value -= x4;
        const output = `
            <div class="battle-log-text">
                <span class="monster-text">Monster </span> attacks and deals
                <span class="dealing">${x4}</span>
            </div>
            <div class="battle-log-text">
                <span class="player-text">Player </span> attacks and deals
                <span class="dealing">${x3}</span>
            </div>
        `;
        battleLog.push(output);
        printBattleLog();
        compare();
    } else window.alert("You can not use the special attack right now!");
});


heal.addEventListener("click", () => {
    const x5 = Math.floor(Math.random() * 40) + 1;
    if (yourHealth.value + x5 < 100 && healCount > 0) {
        healCount--;
        yourHealth.value += x5; 
        let output = `
        <div class="battle-log-text"> 
                <span class="player-text">Player</span> heals himself for <span class="healing"> ${x5} </span>
        </div>
        `;
        battleLog.push(output);
        printBattleLog();
    } else window.alert("Try again!")
});

giveUp.addEventListener("click", () => {
   buttons.remove();
   end("You lost....");
   removeBattleLog();
});



