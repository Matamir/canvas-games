import { useEffect, useState } from "react";

const EstimationGame = () => {

    let [goal, setGoal] = useState(Math.ceil(Math.random() * 100))
    let min = 0;
    let max = 10000
    const [value, setValue] = useState(min/2);

    const handleInput = (event) => {
        setValue(event.target.value)
    }

    function submit () {
        let slider = document.getElementById("slider");
        if ( slider != null ) {
            let value = slider.value / 100
            console.log(value)
            let percent = ( Math.abs(value - goal) / ( (value + goal) / 2 ) ) * 100
            console.log(percent)
        }
    }

    return (
        <div style={{width:"100%", height:"100%", position:"fixed", top: "50%", left: "40%"}}>
            <div style={{position: "relative", left: "9%"}}>
                {goal}
            </div>
            <input id="slider" style={{width:"20%"}} onInput={handleInput} type="range" min={min} max={max} value={value} step="1"/>
            <br/>
            <input onClick={()=>{submit()}} style={{color: "blue", width: "10%", position:"relative", left: "5%"}} type="button" />
        </div>
    )
}
export default EstimationGame;