import { useEffect } from "react";

const Baseball = () => {

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        var xHome = canvas.width * 2 / 4 + canvas.height * 0 / 4
        var yHome = canvas.height * 3 / 4

        var xFirst = canvas.width * 2 / 4 + canvas.height * 1 / 4
        var yFirst = canvas.height * 2 / 4

        var xSecond = canvas.width * 2 / 4 + canvas.height * 0 / 4
        var ySecond = canvas.height * 1 / 4

        var BASE_SIZE = canvas.height / 50

        var xThird = canvas.width * 2 / 4 + canvas.height * -1 / 4
        var yThird = canvas.height * 2 / 4

        var xMound = xThird + (xFirst - xThird) / 2
        var yMound = yFirst - BASE_SIZE * 2


        function updatefield() {
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d");

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

            xHome = canvas.width * 2 / 4 + canvas.height * 0 / 4
            yHome = canvas.height * 3 / 4

            xFirst = canvas.width * 2 / 4 + canvas.height * 1 / 4
            yFirst = canvas.height * 2 / 4

            xSecond = canvas.width * 2 / 4 + canvas.height * 0 / 4
            ySecond = canvas.height * 1 / 4

            BASE_SIZE = canvas.height / 50

            xThird = canvas.width * 2 / 4 + canvas.height * -1 / 4
            yThird = canvas.height * 2 / 4

            xMound = xThird + (xFirst - xThird) / 2
            yMound = yFirst - BASE_SIZE * 2
        }


        function drawField() {

            ////////////// Green //////////////
            context.fillStyle = "rgb(0, 100, 0)"
            context.fillRect(0, 0, canvas.width, canvas.height)

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

        function generatePitch() {

            let x = xMound;
            let y = yMound;
            let xVel = 0;
            let yVel = 0;
            let xAccel = Math.random() * .004 - .002;
            let yAccel = Math.random() * .015 + .005;

            pitch = { x, y, xVel, yVel, xAccel, yAccel };
        }

        function drawPitch() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawField();
            drawBat();

            let { x, y, xVel, yVel, xAccel, yAccel } = pitch

            x += xVel;
            y += yVel;

            xVel += xAccel;
            yVel += yAccel;

            context.fillStyle = "rgb(255,255,255)"
            context.strokeStyle = "rgb(0,0,0)"
            context.lineWidth = 1;
            context.beginPath();
            context.arc(x, y, 5, 0, 360);
            context.stroke();
            context.fill();

            pitch = { x, y, xVel, yVel, xAccel, yAccel };

        }



        let bat = {
            angle: Math.PI / 2,
            xBatStart: xHome - BASE_SIZE,
            yBatStart: yHome - BASE_SIZE,
        }

        function resetBat() {
            bat = {
                angle: Math.PI / 2,
                xBatStart: xHome - BASE_SIZE,
                yBatStart: yHome - BASE_SIZE,
            }
        }

        function drawBat() {
            context.strokeStyle = "rgb(0,0,0)"
            let xBatEnd = bat.xBatStart + Math.cos(bat.angle) * BASE_SIZE * 2;
            let yBatEnd = bat.yBatStart + Math.sin(bat.angle) * BASE_SIZE * 2;
            
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(bat.xBatStart, bat.yBatStart);
            context.lineTo(xBatEnd, yBatEnd);
            context.stroke();

        }

        function swingBat() {

            context.clearRect(0, 0, canvas.width, canvas.height);

            let angle = bat.angle - 0.0174533*10;

            bat = {
                xBatStart: xHome - BASE_SIZE,
                yBatStart: yHome - BASE_SIZE,
                angle: angle,
            }

        }

        function animate() {
            drawField();
            drawBat();
            drawPitch();
            requestAnimationFrame(animate);
        }

        animate();

        // Throw a pitch when click
        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            generatePitch();
        }

        // Swing bat when spacebar
        window.addEventListener("spacedown", onkeydown);
        onkeydown = (event) => {
            if(event.code == "Space") {
                swingBat();
            }
        }

        // Swing bat when spacebar
        window.addEventListener("spacedown", onkeyup);
        onkeyup = (event) => {
            if(event.code == "Space") {
                resetBat();
            }
        }

        // Automatically resize everything if the window size is changed
        const handleResize = () => { updatefield(); drawField(); }
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