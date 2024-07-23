import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import bouncyImage from "../images/Bouncy.png"
import baseballImage from "../images/Baseball.png"
import circleImage from "../images/Circle.png"
import estimationGameImage from "../images/EstimationGame.png"
import colorGuessrImage from "../images/ColorGuessr.png"
import colorMatcherImage from "../images/ColorMatcher.png"


const Selection = () => {

    let opts =
        [{ name: "Bouncy", link: "./Bouncy", image: bouncyImage },
        { name: "Baseball", link: "./Baseball", image: baseballImage },
        { name: "Circle", link: "./Circle", image: circleImage },
        { name: "Estimation Game", link: "./EstimationGame", image: estimationGameImage },
        { name: "Color Guessr", link: "./ColorGuessr", image: colorGuessrImage },
        { name: "Color Matcher", link: "./ColorMatcher", image: colorMatcherImage },
        ]

    const [size, setSize] = useState("vw")

    function updateWindowSize() {
        if (window.innerWidth < window.innerHeight) {
            setSize("vh")
        } else {
            setSize("vw")
        }
    }

    useEffect(() => { updateWindowSize(); }, []);

    window.addEventListener("resize", updateWindowSize);

    return (
        <nav>

            <div className="row">
                {opts.map((option) => {

                    return (
                        <NavLink
                            className="col-1 border"
                            style={{
                                height: "33" + size,
                                paddingLeft: "10vw",
                                width: "33" + size,
                                backgroundImage: `url(${option.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                            to={option.link}>
                        </NavLink>
                    )

                })
                }
            </div >
        </nav>
    );


}
export default Selection;