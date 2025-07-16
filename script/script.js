let boxes = document.querySelectorAll(".box");
let resetbuttons = document.querySelectorAll(".reset");
let turn0 = true;
let winscreen = document.querySelector(".winscreen");
let winwrapper = document.querySelector(".winwrapper");
let count = 0;
let state = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let gameOver = false;
const winsound=document.querySelector("#winsound");
const crosssound=document.querySelector("#crosssound");
const circlesound=document.querySelector("#circlesound");
let winner = null;
boxes.forEach((box, index) => {
    box.addEventListener("click", (e) => {
        if (gameOver || box.innerHTML.trim() !== "") return;
        let row = Math.floor(index / 3);
        let col = index % 3;
        if (turn0) {
            const x = document.createElement("div");
            x.classList.add("x");
            const l1 = document.createElement("div");
            l1.classList.add("l1");
            const l2 = document.createElement("div");
            l2.classList.add("l2");
            x.appendChild(l1);
            x.appendChild(l2);
            box.appendChild(x);
            state[row][col] = 1;
            crosssound.currentTime=0;
            crosssound.play();
            count++;
        } else {
            const y = document.createElement("div");
            y.classList.add("y");
            const y1 = document.createElement("div");
            y1.classList.add("y1");
            y.appendChild(y1);
            box.appendChild(y);
            state[row][col] = 0;
            count++;
            circlesound.currentTime=0;
            circlesound.play();
        }
        turn0 = !turn0;
    });
});
function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (state[i][0] !== null && state[i][0] === state[i][1] && state[i][1] === state[i][2]) {
            winner = state[i][0];
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (state[0][i] !== null && state[0][i] === state[1][i] && state[1][i] === state[2][i]) {
            winner = state[0][i];
            return true;
        }
    }
    if (state[0][0] !== null && state[0][0] === state[1][1] && state[1][1] === state[2][2]) {
        winner = state[0][0];
        return true;
    }
    if (state[0][2] !== null && state[0][2] === state[1][1] && state[1][1] === state[2][0]) {
        winner = state[0][2];
        return true;
    }
    return false;
}
const RESET = () => {
    let r = document.createElement("div");
    r.classList.add("reset");
    r.innerText = "Play Again";
    r.style.fontSize="15px";
    r.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.innerHTML = "";
        });
        winwrapper.style.display = "none";
        turn0 = true;
        state = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        count = 0;
        winscreen.innerHTML = ""; 
        gameOver = false;
    });
    winscreen.append(r);
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (checkWinner() === true) {
            gameOver = true;
            winscreen.innerText = winner===1?"Cross Won The GAME !!!":"Circle Won The GAME !!!";
            winwrapper.style.display = "block";
            RESET();
            winsound.currentTime=0;
            winsound.play();

            }
        else if (count === 9) {
            gameOver = true;
            winwrapper.style.display = "block";
            winscreen.innerText = "Game Draw";
            RESET();
        }
    }
    )
})
resetbuttons.forEach((reset) => {
    reset.addEventListener("click", () => {
        boxes.forEach((box) => {
            box.innerHTML = "";
        });
        winwrapper.style.display = "none";
        turn0 = true;
        state = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]; count = 0;
        gameOver = false;
    });
})
const checkbox = document.getElementById("bg");
checkbox.addEventListener("change", () => {
    document.body.style.backgroundColor = checkbox.checked ? "black" : "#DCFFB7";
})
