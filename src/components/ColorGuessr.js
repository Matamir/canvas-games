import React from "react";
import { NavLink } from "react-router-dom";

const ColorGuessr = () => {

    let rGuess = Math.ceil(Math.random() * 255)
    let gGuess = Math.ceil(Math.random() * 255)
    let bGuess = Math.floor(Math.random() * 255)
    let guess = "rgb(" + rGuess + "," + gGuess + "," + bGuess + ")"
    let colors = []

    let placement = Math.random() * 9

    for (let i = 0; i < 9; i++) {

        if (i == placement) {
            colors.push(guess)
        } else {


            let r = Math.ceil(Math.random() * 255)
            let g = Math.ceil(Math.random() * 255)
            let b = Math.floor(Math.random() * 255)

            colors.push("rgb(" + r + "," + g + "," + b + ")")

            console.log(colors[i])
        }
    }

    let square = -1;


    function col() {
        square++

        return <div className="col" style={{ backgroundColor: colors[square] }} />
    }

    function row() {
        return <div className="row" style={{ width: "100%", height: "30vh" }}>
            {col()} {col()} {col()}
        </div>
    }

    return <div>
        <div style={{ height: "5vh", fontSize:"3vh", margin: "auto", textAlign: "center" }}> {guess} </div>
        <div className="container" style={{ marginTop: "0vh" }}>
            {row()} {row()} {row()}
        </div>
    </div>

}
export default ColorGuessr;