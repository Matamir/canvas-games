import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const PlatformerGame = () => {

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let SCREEN_SIZE = 1000
        let PLAYER_SIZE = 10
        let PLAYER_SPEED = 0.05

        let xOrigin = canvas.width / 2 - SCREEN_SIZE / 4
        let yOrigin = canvas.height / 2 - SCREEN_SIZE / 4
        let xGameSize = SCREEN_SIZE / 2
        let yGameSize = SCREEN_SIZE / 2

        let pressedKeys = new Set()

        function updateCanvasSize() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            xOrigin = canvas.width / 2 - SCREEN_SIZE / 4
            yOrigin = canvas.height / 2 - SCREEN_SIZE / 4
            xGameSize = SCREEN_SIZE / 2
            yGameSize = SCREEN_SIZE / 2
        }

        // const handleResize = () => { updateCanvasSize(); }
        // window.addEventListener("resize", handleResize);

        function movePlayer() {
            if (player.x + player.xVel > xGameSize - PLAYER_SIZE) {
                player.x = xGameSize - PLAYER_SIZE
                player.xVel = 0
            } else if (player.x + player.xVel < 0) {
                player.x = 0
                player.xVel = 0
            }


            if (player.y + player.yVel > yGameSize - PLAYER_SIZE) {
                player.y = yGameSize - PLAYER_SIZE
                player.yVel = 0
            } else if (player.y + player.yVel < 0) {
                player.y = 0
                player.yVel = 0
            }


            player.x += player.xVel
            player.y += player.yVel
        }

        function animate() {
            updateCanvasSize()
            movePlayer()
            controls()

            context.fillStyle = "white"
            context.fillRect(xOrigin, yOrigin, xGameSize, yGameSize)

            context.fillStyle = "red"
            context.fillRect(xOrigin + player.x, yOrigin + player.y, PLAYER_SIZE, PLAYER_SIZE)

            requestAnimationFrame(animate)
        }

        const player = {}
        player.x = 0;
        player.y = 0;
        player.xVel = 0;
        player.yVel = 0;

        function jump() {
            console.log("JUMPING")
        }

        animate();

        // Function to handle keyboard presses
        function controls(pollingRate) {

            if (pressedKeys.has("Space")) {
                jump();
            }

            if (pressedKeys.has("KeyW")) {
                player.yVel -= PLAYER_SPEED
            }

            if (pressedKeys.has("KeyS")) {
                player.yVel += PLAYER_SPEED
            }

            if (pressedKeys.has("KeyA")) {
                player.xVel -= PLAYER_SPEED
            }

            if (pressedKeys.has("KeyD")) {
                player.xVel += PLAYER_SPEED
            }

        }

        // Swing bat when spacebar
        window.addEventListener("keyDown", onkeydown);
        onkeydown = (event) => {
            pressedKeys.add(event.code)
        }

        window.addEventListener("keyUp", onkeyup);
        onkeyup = (event) => {
            pressedKeys.delete(event.code)
        }

        return () => {
            window.removeEventListener("keyDown", onkeydown);
            window.removeEventListener("keyUp", onkeyup);
        }
    }, []);

    return (
        <div>
            <canvas
                style={{
                    backgroundColor: "rgb(20,0,50)",
                    display: "block",
                }}
                id="canvas">

            </canvas>


        </div>
    )

}
export default PlatformerGame;