import { useEffect, useState } from "react";

const EstimationGame = () => {

    let min = 0;
    let max = 100
    const [value, setValue] = useState(min/2);

    const handleInput = (event) => {
        setValue(event.target.value)
    }

    return (
        <div style={{width:"100%", height:"100%", position:"fixed", top: "50%", left: "40%"}}>
            <input style={{width:"20%"}} onInput={handleInput} type="range" min={min} max={max} value={value} step="1" id="myRange"/>
        </div>
    )
}
export default EstimationGame;