import { useEffect } from "react";


const Snake = () => {
    useEffect(() => {

        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");

        let snake = [0, 0]

        function drawGrid() {

            canvas.width = document.documentElement.clientWidth;
            canvas.height = document.documentElement.clientHeight;

            for (let x = 0; x < canvas.width; x += 20) {
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
            }

            for (let y = 0; y < canvas.height; y += 20) {
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
            }

            context.stroke();
        }

        drawGrid();

        // Automatically resize everything if the window size is changed
        const handleResize = () => { drawGrid(); }
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