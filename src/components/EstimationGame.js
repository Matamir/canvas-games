import { useEffect, useState } from "react";

const EstimationGame = () => {

    
    let [goal, setGoal] = useState(Math.ceil(Math.random() * 100))
    let min = 0;
    let max = 10000
    const [value, setValue] = useState(min/2);

    const handleInput = (event) => {
        setValue(event.target.value)
    }

    function resetGoal() {
        setGoal(Math.ceil(Math.random() * 100))
    }

    function submit () {
        let slider = document.getElementById("slider");
        if ( slider != null ) {
            let value = slider.value / 100
            console.log(value)
            // let percent = ( Math.abs(value - goal) / ( (value + goal) / 2 ) ) * 100
            // console.log(percent)
            if ( Math.abs(value - goal) < 2 ) {
                window.alert( "Your placement was: " + value + "\nGREAT JOB!!" )
                resetGoal();
            } else {
                window.alert( "Your placement was: " + value + "\nBetter luck next time :(" )
            }
        }
    }

    return (
        <div style={{width:"100%", height:"100%", position:"fixed", top: "50%", left: "10%"}}>
            <div style={{position: "relative", left: "40%"}}>
                {goal}
            </div>
            <input id="slider" style={{width:"80%"}} onInput={handleInput} type="range" min={min} max={max} value={value} step="1"/>
            <br/>
            <button onClick={()=>{submit()}} style={{color: "blue", width: "10%", height: "5%", position:"relative", left: "35%"}} type="button" />
            <br/>
            {/* <button onClick={()=>{resetGoal()}} className={"mt-2"} style={{fontSize: "30px", fontWeight:"bold", width: "3%", position:"relative", left: "8.5%"}}>
                ⟳
            </button> */}
        </div>
    )
}
export default EstimationGame;