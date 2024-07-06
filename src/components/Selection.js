import React from "react";
import { NavLink } from "react-router-dom";

const Selection = () => {




    let opts =
        [{ name: "Bouncy", link: "./Bouncy" },
        { name: "Baseball", link: "./Baseball" },
        { name: "Circle", link: "./Circle" },
        { name: "Estimation Game", link: "./EstimationGame" },
        ]

    const optionsDisplay = () => {

        return (
            <div>
                {opts.map((option) => {
                    return (
                        <div>
                            <NavLink to={option.link}>
                                {option.name}
                            </NavLink>
                            <br />
                        </div>
                    )
                })}
            </div>
        );

    }

    return (
        <nav>
            {optionsDisplay()}
        </nav>
    )
}
export default Selection;