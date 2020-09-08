import React from "react";
import "./FullPageLoader.css"
import Loader from "../../assets/images/loader.gif"

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Loader} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;