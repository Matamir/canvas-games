import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ColorGuessr = () => {

    let [colors, setColors] = useState([])
    let [pick, setPick] = useState("")

    function resetPick() {
        let newColors = []

        let rPick = Math.ceil(Math.random() * 255)
        let gPick = Math.ceil(Math.random() * 255)
        let bPick = Math.floor(Math.random() * 255)

        let newPick = "rgb(" + rPick + "," + gPick + "," + bPick + ")"
        let placement = Math.floor(Math.random() * 9)


        for (let i = 0; i < 9; i++) {

            let square = document.getElementById("square" + i)
            square.textContent = ""

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
        return <div id={"square" + square} className="col" style={{ backgroundColor: colors[square], color: colors[square], fontWeight: "bold", textAlign: "center", paddingTop: "10vh" }} onClick={() => { guess(index) }} textContent="" />
    }

    function row() {
        return <div className="row" style={{ width: "100%", height: "30vh" }}>
            {col()} {col()} {col()}
        </div>
    }

    return <div>
        <div style={{ height: "5vh", fontSize: "3vh", margin: "auto", textAlign: "center" }}> {pick} </div>
        <div className="container" style={{ marginTop: "0vh" }}>
            {row()} {row()} {row()}
        </div>
    </div>

}
export default ColorGuessr;