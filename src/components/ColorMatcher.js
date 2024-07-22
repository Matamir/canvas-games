import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ColorMatcher = () => {

    let [rGuess, setrGuess] = useState(0)
    let [gGuess, setgGuess] = useState(0)
    let [bGuess, setbGuess] = useState(0)

    let [guess, setGuess] = useState("rgb(" + rGuess + "," + gGuess + "," + bGuess + ")")
    let [goal, setGoal] = useState("")

    function resetGoal() {
        let rPick = Math.ceil(Math.random() * 255)
        let gPick = Math.ceil(Math.random() * 255)
        let bPick = Math.floor(Math.random() * 255)

        let newPick = "rgb(" + rPick + "," + gPick + "," + bPick + ")"

        setGoal(newPick)
    }

    useEffect(() => {
        resetGoal();
    }, []);

    function updateGuess(color) {
        let slider = document.getElementById(color)

        switch (color) {
            case "red":
                setrGuess(slider.value)
                break;
            case "green":
                setgGuess(slider.value)
                break;
            case "blue":
                setbGuess(slider.value)
                break;
        }

        setGuess("rgb(" + rGuess + "," + gGuess + "," + bGuess + ")")
    }


    return <div>
        <div className="container" style={{ marginTop: "5vh", width: "100vw", height: "50vh" }}>
            <div className="row" style={{ width: "100%", height: "10vh", fontWeight: "bold", fontSize: "5vh" }}>
                <div className="col">Guess</div>
                <div className="col-1" />
                <div className="col">Goal</div>
            </div>
            <div className="row" style={{ width: "100%", height: "100%" }}>
                <div className="col" style={{ backgroundColor: goal }} onClick={() => { }} />
                <div className="col-1" style={{ backgroundColor: "white" }} onClick={() => { }} />
                <div className="col" style={{ backgroundColor: guess }} onClick={() => { }} />
            </div>

            <br />

            <div className="row">
                <div style={{ width: "10%" }}> R: {rGuess} </div>
                <input id="red" style={{ width: "80%" }} onInput={() => { updateGuess("red") }} type="range" min={0} max={255} value={rGuess} step="1" />
            </div>
            <div className="row">
                <div style={{ width: "10%" }}> G: {gGuess} </div>
                <input id="green" style={{ width: "80%" }} onInput={() => { updateGuess("green") }} type="range" min={0} max={255} value={gGuess} step="1" />
            </div>
            <div className="row">
                <div style={{ width: "10%" }}> B: {bGuess} </div>
                <input id="blue" style={{ width: "80%" }} onInput={() => { updateGuess("blue") }} type="range" min={0} max={255} value={bGuess} step="1" />
            </div>
        </div>
    </div >

}
export default ColorMatcher;