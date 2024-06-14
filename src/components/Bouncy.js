import { useRef } from "react";
import { useEffect, useState } from "react";

const Bouncy = () => {

    const [xGrav, setXGrav] = useState(.01);
    const [yGrav, setYGrav] = useState(.081);
    const bouncingObjects = useRef([]);

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        function drawBoard() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

            ////////////// Background //////////////
            context.fillStyle = "rgb(91, 206, 250)"
            context.fillRect(0, 0, canvas.width, canvas.height)

            ////////////// Grid //////////////    
            context.lineWidth = 1;
            context.strokeStyle = "rgb(0,0,75)";
            for (var x = 0; x < canvas.width; x += 50) {
                for (var y = 0; y < canvas.height; y += 50) {
                    context.strokeRect(x, y, 50, 50);
                }
            }

            ////////////// Bowl //////////////
            context.strokeStyle = "rgb(245, 169, 184)";
            context.lineWidth = 10;
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 500, 0, Math.PI)
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

        // Adds a bouncy thing at a random location with random velocity
        function addBouncyThing() {
            let x = Math.random() * (canvas.width - 50);
            let y = Math.random() * (canvas.height - 50);
            let velX = Math.random() * 5;
            let velY = Math.random() * 5;
            let color = RandomColor();

            bouncingObjects.current.push({ x, y, velX, velY, color })
        }

        // Adds a bouncy thing at mouse click location with no velocity
        function addBouncyThingAt(clickX, clickY) {
            let x = clickX;
            let y = clickY;
            let velX = 0;
            let velY = 0;
            let color = RandomColor();
            let accelX = xGrav
            let accelY = yGrav

            bouncingObjects.current.push({ x, y, velX, velY, accelX, accelY, color })
        }

        function drawBouncyThings() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBoard();

            let BALL_SIZE = 25;

            bouncingObjects.current.forEach((object) => {

                let { x, y, velX, velY, accelX, accelY, color } = object;

                x += velX;
                y += velY;

                velX += accelX
                velY += accelY

                if (x > canvas.width - BALL_SIZE || x < BALL_SIZE) {
                    velX = -velX
                    velX = velX * .9
                    //color = RandomColor();
                    x = (x < BALL_SIZE) ? BALL_SIZE + 1 : canvas.width - BALL_SIZE
                }

                if (y > canvas.height - BALL_SIZE) {
                    velY = -velY
                    velY = velY * .975
                    //color = RandomColor();
                    y = (y < BALL_SIZE) ? BALL_SIZE + 1 : canvas.height - BALL_SIZE
                }


                let distanceFromCenter = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2))
                if (Math.abs(distanceFromCenter - 500) < BALL_SIZE && y > canvas.height / 2 - BALL_SIZE) {
                    if (distanceFromCenter - 500 < 0) {

                        // Calculate angle between ball and center of arc
                        let angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);

                        // Reflect ball velocity based on angle of collision
                        let speed = Math.sqrt(velX * velX + velY * velY) * .95;
                        angle += Math.PI; // Reverse angle for reflection
                        velX = Math.cos(angle) * speed;
                        velY = Math.sin(angle) * speed;

                    } else {
                        // Calculate angle between ball and center of arc
                        let angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);

                        // Reflect ball velocity based on angle of collision
                        let speed = Math.sqrt(velX * velX + velY * velY) * .95;
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

        // Add a bunch of balls
        let NUMBER_STARTING_BALLS = 0
        for (let i = 0; i < NUMBER_STARTING_BALLS; i++) {
            addBouncyThing();
        }

        // Draw everything
        drawBoard();
        drawBouncyThings();


        // Add a new ball when the screen is clicked
        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            addBouncyThingAt(event.clientX, event.clientY);
        }

        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawBoard(); }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("click", onclick);

        }
    }, [xGrav, yGrav]);

    return (
        <div>
            <div class = "slider">
                <input type="range" min="-.1" max= ".1" value ={xGrav} class="slider" id="xGrav" step="0.01" 
                    onChange={(x) => setXGrav(parseFloat(x.target.value))} />
                    {xGrav}
                <input type="range" min="-.1" max= ".1" value ={yGrav} class="slider"  id="yGrav" step="0.01"
                    onChange={(y) => setYGrav(parseFloat(y.target.value))} />
                    {yGrav}
            </div>

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
export default Bouncy;