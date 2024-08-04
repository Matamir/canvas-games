import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ColorGuessr = () => {

    let [colors, setColors] = useState([])
    let [pick, setPick] = useState("")
    let [difficulty, setDifficulty] = useState(9)

    const [size, setSize] = useState(200)

    function updateWindowSize() {

        setSize(
            Math.min(
                (window.innerWidth / 2),
                Math.max(
                    (window.innerWidth / difficulty),
                    (window.innerWidth /
                        (Math.floor(window.innerWidth / 200)))
                )
            )
        )

        // if (window.innerWidth > window.innerHeight) {
        //     setSize("vh")
        // } else {
        //     setSize("vw")
        // }
    }

    useEffect(() => { updateWindowSize(); }, []);
    window.addEventListener("resize", updateWindowSize);


    function resetPick() {
        let newColors = []

        let rPick = Math.ceil(Math.random() * 255)
        let gPick = Math.ceil(Math.random() * 255)
        let bPick = Math.floor(Math.random() * 255)

        let newPick = "rgb(" + rPick + "," + gPick + "," + bPick + ")"
        let placement = Math.floor(Math.random() * difficulty)


        for (let i = 0; i < difficulty; i++) {

            let square = document.getElementById("square" + i)
            if (square) {
                square.textContent = ""
            }

            if (i == placement) {
                newColors.push(newPick)
            } else {


                let r = Math.ceil(Math.random() * 255)
                let g = Math.ceil(Math.random() * 255)
                let b = Math.floor(Math.random() * 255)

                newColors.push("rgb(" + r + "," + g + "," + b + ")")

            }
        }

        setColors(newColors)
        setPick(newPick)
        updateWindowSize();
    }

    useEffect(() => {
        resetPick();
    }, []);

    //console.log(colors)

    let square = -1;

    function guess(index) {
        //console.log(colors[index])
        if (colors[index] == pick) {
            window.alert(" YOU GUESSED CORRECT, GREAT JOB!!")
            resetPick()
        } else {
            let square = document.getElementById("square" + index)
            square.textContent = colors[index]
            square.style.backgroundColor = "white"
        }
    }

    function col() {
        square++

        let index = square;
        return <div id={"square" + square} className="col-1"
            style={{
                backgroundColor: colors[square],
                color: colors[square],
                width: size + "px",
                height: size + "px",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "3" + size,
                paddingTop: "10vh"
            }}
            onClick={() => { guess(index) }} textContent="" />
    }

    const handleInput = (event) => {
        setDifficulty(event.target.value)
    }

    return <div>
        <div style={{ height: "5vh", fontSize: "3vh", margin: "auto", textAlign: "center" }}>
            difficulty slider: <input id="red" style={{ width: "10%" }} onInput={handleInput} type="range" min={2} max={50} value={difficulty} step="1" />
            <br />
            {pick}

        </div>
        <div className="row" style={{ marginTop: "5vh" }} >
            {colors.map(() => { return col() })}
        </div>
    </div>

}
export default ColorGuessr;