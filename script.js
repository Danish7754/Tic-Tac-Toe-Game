const block = document.querySelectorAll(".cell");//queryselector give the list of element not a single Element
const btn = document.getElementById("b1");
const msg = document.getElementById('msg');
const Plyturn = document.getElementById('turn');
let currPlayer = "X";
let Arr = ["", "", "", "", "", "", "", "", ""];
let roundwon = false;
let i = 0;
let Gameover = false

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];
function checkWinner(cell) {
    for (let combo of winningCombos) {
        //destructind
        const [a, b, c] = combo
        if (cell[a] && cell[a] === cell[b] && cell[b] === cell[c]) {
            const wincell = [document.getElementById(a), document.getElementById(b), document.getElementById(c)]
            wincell.forEach(cell => {
                cell.classList.add('win');
            });
            roundwon = true
            break;
        }
    }
    //---------------------------------------------------------------------------------------------------------------
    // when any payer win
    if (roundwon) {
        msg.textContent = (`Player ${currPlayer} Won`);
        Plyturn.textContent = (`Player ${currPlayer} Won`);
        Gameover = true
        roundwon = false;
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    //when no result found
    else if (!cell.includes("")) {
        msg.textContent = ("Match Draw")
        Plyturn.textContent = ("Match Draw");
        roundwon = false;
    }
}
// traversal of each block 
block.forEach(cell => {
    cell.addEventListener("click", () => {
        if (Gameover || cell.textContent !== "") return;
        if (cell.textContent === "") {
            let index = parseInt(cell.id);
            Arr[index] = currPlayer
            cell.textContent = currPlayer;
            currPlayer = currPlayer === "X" ? "O" : "X";
            Plyturn.textContent = (`Player ${currPlayer} Turn`)
            checkWinner(Arr);

        }
    })
})

// restart the game
btn.addEventListener("click", () => {
    currPlayer = "X";
    msg.textContent = ""
    Plyturn.textContent = ""
    Arr = ["", "", "", "", "", "", "", "", ""]
    roundwon = false
    Gameover=false
    block.forEach(cell => cell.textContent = "")
    document.querySelectorAll(".win").forEach(cell => {
        cell.classList.remove("win");
    });

})



