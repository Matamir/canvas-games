import { useEffect } from "react";

const Baseball = () => {




    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        function drawField() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

            ////////////// Green //////////////
            context.fillStyle = "rgb(0, 100, 0)"
            context.fillRect(0, 0, canvas.width, canvas.height)

            ////////////// Bases //////////////    
            const xHome = canvas.width * 2 / 4 + canvas.height * 0 / 4
            const yHome = canvas.height * 3 / 4

            const xFirst = canvas.width * 2 / 4 + canvas.height * 1 / 4
            const yFirst = canvas.height * 2 / 4

            const xSecond = canvas.width * 2 / 4 + canvas.height * 0 / 4
            const ySecond = canvas.height * 1 / 4

            const xThird = canvas.width * 2 / 4 + canvas.height * -1 / 4
            const yThird = canvas.height * 2 / 4

            ////////////// Diamond //////////////    
            context.lineWidth = 1;
            context.fillStyle = "rgb(75, 50, 0)";
            context.beginPath();
            context.moveTo(xHome, yHome);
            context.lineTo(xFirst, yFirst);
            context.lineTo(xSecond, ySecond);
            context.lineTo(xThird, yThird);
            context.lineTo(xHome, yHome);
            context.fill();

            ////////////// Foul Lines //////////////
            context.lineWidth = 5;
            context.strokeStyle = "rgb(255,255,255)";
            context.beginPath();

            // Third Base Foul Line
            let xEndLeftFoulLine = 0;
            let yEndLeftFoulLine = yThird - ((xThird - xEndLeftFoulLine) * (yThird - yHome)) / (xThird - xHome);

            context.moveTo(xHome, yHome);
            context.lineTo(xEndLeftFoulLine, yEndLeftFoulLine);


            // First Base Foul Line
            let xEndRightFoulLine = canvas.width;
            let yEndRightFoulLine = yFirst - ((xFirst - xEndRightFoulLine) * (yFirst - yHome)) / (xFirst - xHome);

            context.moveTo(xHome, yHome);
            context.lineTo(xEndRightFoulLine, yEndRightFoulLine);
            context.stroke();


            ////////////// Bases //////////////
            const BASE_SIZE = canvas.height / 50
            context.fillStyle = "rgb(255,255,255)";

            // Home Plate
            context.moveTo(xHome, yHome)
            context.lineTo(xHome - BASE_SIZE, yHome - BASE_SIZE)
            context.lineTo(xHome, yHome - BASE_SIZE * 2)
            context.lineTo(xHome + BASE_SIZE, yHome - BASE_SIZE)
            context.fill()


            // First Base
            context.moveTo(xFirst, yFirst)
            context.lineTo(xFirst - BASE_SIZE, yFirst - BASE_SIZE)
            context.lineTo(xFirst - BASE_SIZE * 2, yFirst)
            context.lineTo(xFirst - BASE_SIZE, yFirst + BASE_SIZE)
            context.fill()


            // Second Base
            context.moveTo(xSecond, ySecond)
            context.lineTo(xSecond + BASE_SIZE, ySecond + BASE_SIZE)
            context.lineTo(xSecond, ySecond + BASE_SIZE * 2)
            context.lineTo(xSecond - BASE_SIZE, ySecond + BASE_SIZE)
            context.fill()


            // Third Base
            context.moveTo(xThird, yThird)
            context.lineTo(xThird + BASE_SIZE, yThird - BASE_SIZE)
            context.lineTo(xThird + BASE_SIZE * 2, yThird)
            context.lineTo(xThird + BASE_SIZE, yThird + BASE_SIZE)
            context.fill()


            // Mound
            const xMound = xThird + (xFirst - xThird) / 2
            const yMound = yFirst - BASE_SIZE * 2

            context.lineWidth = 10;
            context.beginPath()
            context.moveTo(xMound - BASE_SIZE / 2, yMound)
            context.lineTo(xMound + BASE_SIZE / 2, yMound)
            context.stroke();
            context.fill();

            // Pitcher
            context.fillStyle = "rgb(0,0,0)"
            context.beginPath();
            context.arc(xMound, yMound, 10, 0, Math.PI * 2)
            context.fill()

        }


        let pitch = { x: canvas.width / 2, y: canvas.height / 2, xVel: 0, yVel: 0, xAccel: 0, yAccel: 0 }

        function removePitch() {
            pitch = { x: canvas.width / 2, y: canvas.height / 2, xVel: 0, yVel: 0, xAccel: 0, yAccel: 0 }
        }

        function generatePitch() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

            const xHome = canvas.width * 2 / 4 + canvas.height * 0 / 4
            const yHome = canvas.height * 3 / 4

            const xFirst = canvas.width * 2 / 4 + canvas.height * 1 / 4
            const yFirst = canvas.height * 2 / 4

            const xSecond = canvas.width * 2 / 4 + canvas.height * 0 / 4
            const ySecond = canvas.height * 1 / 4

            const BASE_SIZE = canvas.height / 50

            const xThird = canvas.width * 2 / 4 + canvas.height * -1 / 4
            const yThird = canvas.height * 2 / 4

            const xMound = xThird + (xFirst - xThird) / 2
            const yMound = yFirst - BASE_SIZE * 2

            let x = xMound;
            let y = yMound;
            let xVel = 0;
            let yVel = 0;
            let xAccel = Math.random() * .04 - .02;
            let yAccel = Math.random() * .15 + .05;

            pitch = { x, y, xVel, yVel, xAccel, yAccel };
        }

        function drawPitch() {
            context.clearRect(0, 0, canvas.height, canvas.width);
            drawField();

            let { x, y, xVel, yVel, xAccel, yAccel } = pitch

            x += xVel;
            y += yVel;

            xVel += xAccel;
            yVel += yAccel;

            context.fillStyle = "rgb(255,255,255)"
            context.beginPath();
            context.arc(x, y, 5, 0, 360);
            context.fill();

            pitch = { x, y, xVel, yVel, xAccel, yAccel };

            requestAnimationFrame(drawPitch)
        }


        // Draw everything
        drawField();
        drawPitch();

        // Throw a pitch when click
        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            generatePitch();
        }

        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawField(); }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("click", onmousedown);
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
export default Baseball;