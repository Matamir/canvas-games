import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const ColorFinder = () => {

    let [colors, setColors] = useState([])
    let [difficulty, setDifficulty] = useState(2)
    let [placement, setPlacement] = useState(0)


    const [height, setHeight] = useState(200)
    const [width, setWidth] = useState(200)

    function updateWindowSize() {

        setHeight((window.innerHeight * .85) / difficulty)
        setWidth((window.innerWidth * .85) / difficulty)
        // setSize(
        //     Math.min(
        //         (window.innerWidth / difficulty),
        //         (window.innerHeight / difficulty)
        //     )
        // )
    }

    window.addEventListener("resize", updateWindowSize);


    function resetPick() {
        let newColors = []

        let rPick = Math.ceil(Math.random() * 255)
        let gPick = Math.ceil(Math.random() * 255)
        let bPick = Math.floor(Math.random() * 255)

        let color = "rgb(" + rPick + "," + gPick + "," + bPick + ")"
        let placement = Math.floor(Math.random() * difficulty ** 2)


        for (let i = 0; i < difficulty ** 2; i++) {

            if (i == placement) {
                let offset = 30 - difficulty
                if (Math.random() < .5) {
                    newColors.push("rgb(" + (rPick + offset) + "," + (gPick + offset) + "," + (bPick + offset) + ")")
                } else {
                    newColors.push("rgb(" + (rPick - offset) + "," + (gPick - offset) + "," + (bPick - offset) + ")")
                }
            } else {
                newColors.push(color)
            }
        }

        setPlacement(placement)
        setColors(newColors)
        updateWindowSize();
    }

    useEffect(() => {
        resetPick();
    }, [difficulty]);

    //console.log(colors)

    let square = -1;

    function guess(index) {
        //console.log(colors[index])
        if (index == placement) {
            //window.alert(" YOU GUESSED CORRECT, GREAT JOB!!")
            setDifficulty(difficulty + 1)
        } else {
            window.alert("Good try! You got " + (difficulty - 2) + " in a row!")
            setDifficulty(2)
        }
    }

    function col() {
        square++

        let index = square;
        return <div id={"square" + square} className="col-10"
            style={{
                backgroundColor: colors[square],
                color: colors[square],
                width: width + "px",
                height: height + "px",
                borderRadius: "100%"
            }}
            onClick={() => { guess(index) }} textContent="" />
    }

    return <div>
        <div className="row" style={{ margin: "5%"}} >
            {colors.map(() => { return col() })}
        </div>
    </div>

}
export default ColorFinder;