import React from "react";

function RightSection({ imageURL, productName, productDescription, learnMore }) {
    return (
        <div className="container my-5">
            <div className="row align-items-center">

                {/* Left Side - Text */}
                <div className="col-6 p-4">
                    <h1>{productName}</h1>
                    <p className="mt-3">{productDescription}</p>
                    <a href={learnMore || "/"} className="mt-2 d-inline-block">
                        Learn More
                    </a>
                </div>

                {/* Right Side - Image */}
                <div className="col-6 p-3">
                    <img
                        src={imageURL}
                        alt={productName}
                        className="img-fluid"
                    />
                </div>

            </div>
        </div>
    );
}

export default RightSection;
