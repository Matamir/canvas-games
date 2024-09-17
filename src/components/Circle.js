import { useEffect, useState } from "react";

const Circle = () => {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////                                    Not In Use                                                      ////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // let isPlaying = false;

    // const play = (frequency = 300, duration = 100) => {
    //     let context = new AudioContext();

    //     const gainNode = context.createGain();
    //     gainNode.gain.value = 0.3
    //     const oscillator = context.createOscillator();
    //     oscillator.frequency.value = frequency;
    //     oscillator.type = 'triangle';

    //     oscillator.connect(gainNode);
    //     gainNode.connect(context.destination);
    //     oscillator.start(0);
    //     setTimeout(() => {oscillator.stop(); context.close()}, duration);
    // };

    // function playAudio(height) {
    //     if (!isPlaying) {
    //         console.log("henlo");
    //         isPlaying = true;
    //         play(height * 100 + 200);

    //         // Set a timeout longer than the duration to reset the isPlaying flag
    //         setTimeout(() => {
    //             isPlaying = false;
    //         }, 100);
    //     }
    // }

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");


        var CIRCLE_SIZE = Math.min(canvas.height, canvas.width) / 2;
        const BALL_SIZE = 25;
        const VELOCITY_ABSORBTION = 1;
        const GRAVITY = 0.1

        function updateCanvasSize() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;
            CIRCLE_SIZE = Math.min(canvas.height, canvas.width) / 2;
        }

        function drawBackground() {

            updateCanvasSize()

            ////////////// Background //////////////
            context.fillStyle = "rgb(0, 0, 25)"
            context.fillRect(0, 0, canvas.width, canvas.height)

            ////////////// Bowl //////////////
            context.strokeStyle = "rgb(245, 169, 184)";
            context.lineWidth = 10;
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, CIRCLE_SIZE, 0, Math.PI * 2)
            //context.fill();
            context.stroke();

        }




        // Function to get a random color
        function RandomColor() {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")"
        }




        let bouncingObject = []
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////                                    Not In Use                                                      ////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // // Adds a bouncy thing at a random location with random velocity
        // function addBouncyThing() {
        //     let x = Math.random() * (canvas.width - 50);
        //     let y = Math.random() * (canvas.height - 50);
        //     let velX = Math.random() * 5;
        //     let velY = Math.random() * 5;
        //     let color = RandomColor();

        //     bouncingObject.push({ x, y, velX, velY, color })
        // }

        // // Add a bunch of balls
        // let NUMBER_STARTING_BALLS = 0
        // for (let i = 0; i < NUMBER_STARTING_BALLS; i++) {
        //     addBouncyThing();
        // }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////




        // Adds a bouncy thing at mouse click location with no velocity
        function addBouncyThingAt(clickX, clickY) {
            let x = clickX;
            let y = clickY;
            let velX = 0;
            let velY = 0;
            let color = RandomColor();
            let accelX = 0
            let accelY = GRAVITY

            bouncingObject.push({ x, y, velX, velY, accelX, accelY, color })
        }

        function drawBouncyThings() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBackground();

            bouncingObject.forEach((object) => {

                let { x, y, velX, velY, accelX, accelY, color } = object;

                x += velX;
                y += velY;

                velY += accelY
                velX += accelX


                let distanceFromCenter = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2))
                if (Math.abs(distanceFromCenter - CIRCLE_SIZE) < BALL_SIZE) {
                    if (distanceFromCenter - CIRCLE_SIZE < 0) {

                        // Calculate angle between ball and center of arc
                        let angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
                        
                        // playAudio(Math.abs(1.5 - angle))

                        // Reflect ball velocity based on angle of collision
                        let speed = Math.sqrt(velX * velX + velY * velY) * VELOCITY_ABSORBTION;
                        angle += Math.PI; // Reverse angle for reflection
                        velX = Math.cos(angle) * speed;
                        velY = Math.sin(angle) * speed;

                    } else {

                        // Calculate angle between ball and center of arc
                        let angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);

                        // Reflect ball velocity based on angle of collision
                        let speed = Math.sqrt(velX * velX + velY * velY) * VELOCITY_ABSORBTION;
                        angle += Math.PI; // Reverse angle for reflection
                        velX = -Math.cos(angle) * speed;
                        velY = -Math.sin(angle) * speed;
                    }
                }


                context.fillStyle = color;
                context.beginPath();
                context.arc(x, y, BALL_SIZE, 0, 360)
                context.fill();

                object.x = x;
                object.y = y;
                object.velX = velX;
                object.velY = velY;
                object.accelX = accelX;
                object.accelY = accelY;

                object.color = color;

            })


            requestAnimationFrame(drawBouncyThings);

        }

        // Draw everything
        drawBackground();
        drawBouncyThings();

        // Add a new ball when the screen is clicked
        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            addBouncyThingAt(event.clientX, event.clientY);
        }

        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawBackground(); }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("click", onclick);

        }
    }, []);

    return (
        <div>

            <canvas
                style={{
                    backgroundColor: "",
                    display: "block",
                }}
                id="canvas">

            </canvas>


        </div>
    )
}
export default Circle;