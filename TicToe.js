/* 9 Boxes, 8 differnt combinations for winner
alternate turns for player 1 and player 2
WINNING PATTERNS:
0,1,2 --- 0,3,6 --- 0,4,8 --- 3,4,5 --- 6,7,8 --- 1,4,7 --- 2,5,8 --- 2,4,6
HR         VC        Diag      HR       HR          VC      VC          diag
*/

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbutton");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // if true = playerO turn else playerX turn

// 2D Arrays
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
];
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    
}
boxes.forEach((box) => { //One problem: when we reset game, button which were used in previous game still remian disabled.
    box.addEventListener("click", () => {
        // console.log("Box was clicked!");
        // if (!box.disabled && box.innerText === ""){
        if (turnO === true){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    // }
    });
});
const disableBoxes = () => {
    for (let box of boxes){
        box.disable = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes){
        box.disable = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = () => { //idx 0= pos 1, idx 1= pos 2, idn 2 = pos 3, if all three 
    for (let pattern of winPatterns){  //pos matches, there's winner & if any pos is empty or mismatched,//pattern is an array, by help of it we can find index of individual positions.// we move to next pattern. pos 1,2,3 will remain same for all idx
        let pos1Val = boxes [pattern[0]].innerText;
        let pos2Val = boxes [pattern[1]].innerText;
        let pos3Val = boxes [pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }                                                
};
newGameBtn.addEventListener ("click", resetGame);
resetbtn.addEventListener("click", resetGame);

