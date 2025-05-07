import { useEffect } from "react";


const Snake = () => {
    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let snake = [[0, 0]]


        function drawGrid() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;


            let widthStart = canvas.width * .1
            let heightStart = canvas.height * .1
            let size = (canvas.width < canvas.height) ? canvas.width * .08 : canvas.height * .08

            for (let x = widthStart; x <= widthStart + (size * 10.1); x += size) {
                context.moveTo(x, heightStart);
                context.lineTo(x, heightStart + (size * 10));
            }

            for (let y = heightStart; y <= heightStart + (size * 10.1); y += size) {
                context.moveTo(widthStart, y);
                context.lineTo(widthStart + (size * 10), y);
            }


            context.strokeStyle = "black";
            context.stroke();

        }

        drawGrid();

        function drawSnake() {

            let widthStart = canvas.width * .1
            let heightStart = canvas.height * .1
            let size = (canvas.width < canvas.height) ? canvas.width * .08 : canvas.height * .08


            snake.forEach(snakePart => {

                //context.drawImage(___, widthStart + snakePart[0] * size, heightStart + snakePart[1] * size);
                context.moveTo(widthStart + snakePart[0] * size, heightStart + snakePart[1] * size)
                context.lineTo(widthStart + snakePart[0] * size, heightStart + snakePart[1] * size + size)
                context.lineTo(widthStart + snakePart[0] * size + size, heightStart + snakePart[1] * size + size)
                context.lineTo(widthStart + snakePart[0] * size + size, heightStart + snakePart[1] * size)
            })

            context.fillStyle = "green";
            context.fill();

            // DRAW TONGUE
            context.beginPath();
            context.moveTo(widthStart + (snake[0][0] + .5 * size), heightStart + (snake[0][1] * size))
            context.lineTo(widthStart + (snake[0][0] + .5 * size), heightStart + ((snake[0][1] + .5) * size))
            context.strokeStyle = "pink";
            context.lineWidth = size / 10;
            context.stroke();
        }

        drawSnake();


        function updateSnake() {
            snake.forEach(snakePart => {
                snakePart[0] += 0
                snakePart[1] += 1
            })
        }

        function animate() {
            drawSnake();
            updateSnake();
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 333);
        }

        animate();


        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawGrid(); drawSnake(); }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
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
export default Snake;