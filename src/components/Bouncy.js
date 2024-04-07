import { useEffect } from "react";

const Bouncy = () => {


    

    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        function drawBoard() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

////////////// Background //////////////
            context.fillStyle = "rgb(91, 206, 250)"        
            context.fillRect(0,0,canvas.width, canvas.height)

////////////// Grid //////////////    
            context.lineWidth = 1;
            context.strokeStyle = "rgb(0,0,75)";
            for (var x = 0; x < canvas.width; x += 50) {
                for (var y = 0; y < canvas.height; y += 50) {
                context.strokeRect(x, y , 50, 50);
                }
            }

////////////// Bwol //////////////
            context.strokeStyle = "rgb(245, 169, 184)";
            context.lineWidth = 10;
            context.beginPath();
            context.arc( canvas.width/2, canvas.height/2, 500, 0, Math.PI)
            //context.fill();
            context.stroke();

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
            drawBoard();

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
        drawBoard();
        drawBouncyThings();


        window.addEventListener("click", onmousedown);
        onmousedown = (event) => {
            addBouncyThingAt(event.clientX, event.clientY);
        }

        const handleResize = () => {drawBoard();}

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
export default Bouncy;