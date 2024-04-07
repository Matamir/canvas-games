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
            context.fillRect(0,0,canvas.width, canvas.height)

////////////// Bases //////////////    
            const xHome = canvas.width*2/4 + canvas.height*0/4
            const yHome = canvas.height*3/4

            const xFirst = canvas.width*2/4 + canvas.height*1/4
            const yFirst = canvas.height*2/4
            
            const xSecond = canvas.width*2/4 + canvas.height*0/4
            const ySecond = canvas.height*1/4
            
            const xThird = canvas.width*2/4 + canvas.height*-1/4
            const yThird = canvas.height*2/4

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
            
            context.moveTo(xHome,yHome);
            context.lineTo(xEndLeftFoulLine, yEndLeftFoulLine);


            // First Base Foul Line
            let xEndRightFoulLine = canvas.width;
            let yEndRightFoulLine = yFirst - ((xFirst - xEndRightFoulLine) * (yFirst - yHome)) / (xFirst - xHome);

            context.moveTo(xHome,yHome);
            context.lineTo(xEndRightFoulLine, yEndRightFoulLine);
            context.stroke();


////////////// Bases //////////////
            const BASE_SIZE = 25 
            context.fillStyle = "rgb(255,255,255)";

            // Home Plate
            context.moveTo(xHome,                   yHome)
            context.lineTo(xHome - BASE_SIZE,       yHome - BASE_SIZE)
            context.lineTo(xHome,                   yHome - BASE_SIZE * 2)
            context.lineTo(xHome + BASE_SIZE,       yHome - BASE_SIZE)
            context.fill()


            // First Base
            context.moveTo(xFirst,                  yFirst)
            context.lineTo(xFirst - BASE_SIZE,      yFirst - BASE_SIZE)
            context.lineTo(xFirst - BASE_SIZE * 2,  yFirst)
            context.lineTo(xFirst - BASE_SIZE,      yFirst + BASE_SIZE)
            context.fill()


            // Second Base
            context.moveTo(xSecond,                 ySecond)
            context.lineTo(xSecond + BASE_SIZE,     ySecond + BASE_SIZE)
            context.lineTo(xSecond,                 ySecond + BASE_SIZE * 2)
            context.lineTo(xSecond - BASE_SIZE,     ySecond + BASE_SIZE)
            context.fill()


            // Third Base
            context.moveTo(xThird,                  yThird)
            context.lineTo(xThird + BASE_SIZE,      yThird - BASE_SIZE)
            context.lineTo(xThird + BASE_SIZE * 2,  yThird)
            context.lineTo(xThird + BASE_SIZE,      yThird + BASE_SIZE)
            context.fill()


            // Mound
            context.moveTo(xFirst - xThird, yFirst - yThird)
            context.lineTo(xFirst - xThird, yFirst - yThird)

        }

        


        // Function to get a random color
        function RandomColor() {
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            return "rgb(" + r + "," + g + "," + b + ")"
        }




        let bouncingObject = []

        // Adds a bouncy thing at a random location with random velocity
        function addBouncyThing() {
            let x = Math.random()*(canvas.width - 50);
            let y = Math.random()*(canvas.height - 50);
            let velX = Math.random() * 5 ;
            let velY = Math.random() * 5 ;
            let color = RandomColor();

            bouncingObject.push({x, y, velX, velY, color})
        }

        // Adds a bouncy thing at mouse click location with no velocity
        function addBouncyThingAt(clickX, clickY) {
            let x = clickX;
            let y = clickY;
            let velX = 0;
            let velY = 0;
            let color = RandomColor();
            let accelX = .01
            let accelY = .081

            bouncingObject.push({x, y, velX, velY, accelX, accelY, color})
        }

        function drawBouncyThings() {
            context.clearRect( 0, 0, canvas.height, canvas.width );
            drawField();

            bouncingObject.forEach((object) => {

                let {x, y, velX, velY, accelX, accelY, color} = object;

                x += velX;
                y += velY;

                velY += accelY
                velX += accelX
                

                if(x > canvas.width-25 || x < 25) {
                    velX = -velX
                    velX = velX * .9
                    //color = RandomColor();
                    x = (x < 25) ? 26 : canvas.width - 25
                }
    
                if(y > canvas.height-25 ) {
                    velY = -velY
                    velY = velY * .975
                    //color = RandomColor();
                    y = (y < 25) ? 26 : canvas.height - 25
                }
    
                
                context.fillStyle = color;
                context.beginPath();
                context.arc( x, y, 25, 0, 360)
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
        for ( let i = 0; i < NUMBER_STARTING_BALLS; i++) {
            addBouncyThing();
        }

        // Draw everything
        drawField();
        drawBouncyThings();


        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            addBouncyThingAt(event.clientX, event.clientY);
        }

        const handleResize = () => {drawField();}

        window.addEventListener("resize", handleResize);

        return() => {
            window.removeEventListener("resize",handleResize);
            window.removeEventListener("click",onclick);
            
        }
    }, []);

    return (
        <div>
            <canvas 
                style = {{
                    backgroundColor: "",
                    display:"block",
                }} 
                id="canvas">
                
            </canvas>

            
        </div>
    )
}
export default Baseball;