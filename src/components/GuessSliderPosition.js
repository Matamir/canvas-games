import { useEffect, useState } from "react";

const GuessSliderPosition = () => {


    let [value, setValue] = useState(Math.ceil(Math.random() * 100))
    let [difficulty, setdifficulty] = useState(5)
    let min = 0;
    let max = 10000
    const [guess, setGuess] = useState(0);

    // const handleInput = (event) => {
    //     setValue(event.target.value)
    // }

    function resetValue() {
        setValue(Math.ceil(Math.random() * 100))
    }

    function updateDifficulty(val) {
        let toast = document.getElementById("toast");
        switch (val) {
            case "easy":
                setdifficulty(5)
                break;
            case "medium":
                setdifficulty(3)
                break;
            case "hard":
                setdifficulty(1)
                break;
        }
    }

    function submit() {
        let slider = document.getElementById("slider");
        if (slider != null) {
            let value = slider.value / 100
            console.log(value)
            // let percent = ( Math.abs(value - goal) / ( (value + goal) / 2 ) ) * 100
            // console.log(percent)
            if (Math.abs(value - guess) < difficulty) {
                window.alert("Your placement was: " + value + "\nGREAT JOB!!")
                resetValue();
            } else {
                window.alert("Your placement was: " + value + "\nBetter luck next time :(")
            }
        }
    }

    function difficultyOption(diff) {
        return <text onClick={() => { updateDifficulty(diff) }} style={{ cursor: "grab", color: "blue", textDecoration: "underline", marginRight: "5%" }}> {diff} </text>
    }

    function difficultyChoice() {
        return <div style={{ position: "relative", left: "27.5%" }} className="container" > {difficultyOption("easy")} {difficultyOption("medium")} {difficultyOption("hard")}</div>
    }

    return (
        <div style={{ width: "100%", height: "100%", position: "fixed", top: "50%" }}>

            <div style={{ position: "relative", left: "49%" }}>
                {value + " ± " + difficulty}
            </div>
            <input id="slider" style={{ width: "80%", position: "relative", left: "10%" }} type="range" min={min} max={max} value={value*100} step="1" />
            <br />
            <button onClick={() => { submit() }} style={{ color: "blue", width: "10%", height: "5%", position: "relative", left: "45%" }} type="button" />
            <br />
            {/* <button onClick={()=>{resetGoal()}} className={"mt-2"} style={{fontSize: "30px", fontWeight:"bold", width: "3%", position:"relative", left: "8.5%"}}>
                ⟳
            </button> */}
            {difficultyChoice()}c

            <div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="mr-auto">Bootstrap</strong>
                    <small class="text-muted">11 mins ago</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>

        </div>
    )
}
export default GuessSliderPosition;