import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const PlatformerGame = () => {

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");


        function updateCanvasSize() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
        }


        

        const handleResize = () => { updateCanvasSize(); }
        window.addEventListener("resize", handleResize);
        


        function animate() {

        }

        function jump() {

        }

        animate();

        // Swing bat when spacebar
        window.addEventListener("spacedown", onkeydown);
        onkeydown = (event) => {
            if (event.code == "Space") {
                jump();
            }
        }

        return () => {
            window.removeEventListener("spacedown", onkeydown);
        }
    }, []);

    return (
        <div>
            <canvas
                style={{
                    backgroundColor: "lightblue",
                    display: "block",
                }}
                id="canvas">

            </canvas>


        </div>
    )

}
export default PlatformerGame;