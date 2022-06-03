import React from "react";
import { Link } from "react-router-dom";

const Sociallinkdesktop = (props) => {
    return (
        <>
            <Link className="contact-link">
                <img src={props.img} alt={props.text} />
                <span>{props.text}</span>
            </Link>
        </>
    );
}

export default Sociallinkdesktop;