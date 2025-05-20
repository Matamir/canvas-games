import { useEffect } from "react";


const Snake = () => {
    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let squares = 20;
        let snake = [[squares/2, squares/2]]
        let direction = "left";


        function drawGrid() {
            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;


            let widthStart = canvas.width * .1
            let heightStart = canvas.height * .1
            let size = (canvas.width < canvas.height) ? canvas.width * (.8 / squares) : canvas.height * (.8 / squares)

            for (let x = widthStart; x <= widthStart + (size * squares * 1.01); x += size) {
                context.moveTo(x, heightStart);
                context.lineTo(x, heightStart + (size * squares));
            }

            for (let y = heightStart; y <= heightStart + (size * squares * 1.01); y += size) {
                context.moveTo(widthStart, y);
                context.lineTo(widthStart + (size * squares), y);
            }


            context.strokeStyle = "black";
            context.stroke();

        }

        drawGrid();

        function drawSnake() {

            let widthStart = canvas.width * .1
            let heightStart = canvas.height * .1
            let size = (canvas.width < canvas.height) ? canvas.width * (.8 / squares) : canvas.height * (.8 / squares)


            snake.forEach(snakePart => {

                //context.drawImage(___, widthStart + snakePart[0] * size, heightStart + snakePart[1] * size);
                context.moveTo(widthStart + snakePart[0] * size, heightStart + snakePart[1] * size)
                context.lineTo(widthStart + snakePart[0] * size, heightStart + snakePart[1] * size + size)
                context.lineTo(widthStart + snakePart[0] * size + size, heightStart + snakePart[1] * size + size)
                context.lineTo(widthStart + snakePart[0] * size + size, heightStart + snakePart[1] * size)
            })

            context.fillStyle = "green";
            context.fill();

            // DRAW Eyes
            context.beginPath();
            // context.moveTo(widthStart + ((snake[0][0] + .5) * size), heightStart + (snake[0][1] * size))
            // context.lineTo(widthStart + ((snake[0][0] + .5) * size), heightStart + ((snake[0][1] + .5) * size))
            context.arc(widthStart + ((snake[0][0] + .25) * size), heightStart + ((snake[0][1] + .5) * size), size / 20, 0, Math.PI * 2)
            context.strokeStyle = "Black";
            context.lineWidth = size / 10;
            context.stroke();

            context.beginPath();
            context.arc(widthStart + ((snake[0][0] + .75) * size), heightStart + ((snake[0][1] + .5) * size), size / 20, 0, Math.PI * 2)
            context.stroke();
        }

        drawSnake();


        function updateSnake() {

            switch (direction) {
                case "up":
                    snake.unshift([snake[0][0], snake[0][1] - 1]);
                    break;
                case "down":
                    snake.unshift([snake[0][0], snake[0][1] + 1]);
                    break;
                case "left":
                    snake.unshift([snake[0][0] - 1, snake[0][1]]);
                    break;
                case "right":
                    snake.unshift([snake[0][0] + 1, snake[0][1]]);
                    break;
            }


            snake.pop()

            // Makes snake loop around board
            snake.forEach(snakePart => {
                if (snakePart[0] > squares - 1) { snakePart[0] = 0 }

                if (snakePart[0] < 0) { snakePart[0] = squares - 1 }

                if (snakePart[1] > squares - 1) { snakePart[1] = 0 }

                if (snakePart[1] < 0) { snakePart[1] = squares - 1 }
            })
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid();
            drawSnake();
            updateSnake();
            setTimeout(() => {
                requestAnimationFrame(animate);
            }, 200);
        }

        animate();


        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawGrid(); drawSnake(); }
        window.addEventListener("resize", handleResize);


        window.addEventListener("keypress", onkeydown);
        onkeydown = (event) => {
            if (event.code == "KeyW" || event.code == "ArrowUp") {

                direction = "up"

                // snake.forEach(snakePart => {
                //     snakePart[0] += 0
                //     snakePart[1] += -1
                // })
            } else if (event.code == "KeyS" || event.code == "ArrowDown") {

                direction = "down"

                // snake.forEach(snakePart => {
                //     snakePart[0] += 0
                //     snakePart[1] += 1
                // })
            } else if (event.code == "KeyA" || event.code == "ArrowLeft") {

                direction = "left"

                // snake.forEach(snakePart => {
                //     snakePart[0] += -1
                //     snakePart[1] += 0
                // })

            } else if (event.code == "KeyD" || event.code == "ArrowRight") {

                direction = "right"

                // snake.forEach(snakePart => {
                //     snakePart[0] += 1
                //     snakePart[1] += 0
                // })
            }

            // Makes snake loop around board
            snake.forEach(snakePart => {
                if (snakePart[0] > 9) { snakePart[0] = 0 }

                if (snakePart[0] < 0) { snakePart[0] = 9 }

                if (snakePart[1] > 9) { snakePart[1] = 0 }

                if (snakePart[1] < 0) { snakePart[1] = 9 }
            })
        }


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