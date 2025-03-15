import React from "react";
import Mcdo from "./mcdo.png";      
import Bk from "./burgerKing.png";  
import kf from "./kfc.png";
import pzhut from "./pizzaHut.png";
import "./ButtonWithLogo.css";

function ButtonWithLogo() {
    return (
        <div className="buttonContainer">
            <button className="mcdoButton">
                <img src={Mcdo} alt="McDonald's Logo" />
            </button>

            <button className="bkButton">
                <img src={Bk} alt="Burger King Logo" />
            </button>

            <button className="kfcButton">
                <img src={kf} alt="KFC Logo" />
            </button>

            <button className="phutButton">
                <img src={pzhut} alt="Pizza Hut Logo" />
            </button>

        </div>
    );
}

export default ButtonWithLogo;
