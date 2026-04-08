import React from "react";

function LeftSection({
    imageURL,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}) {
    return (
        <div className="container" style={{ marginTop: "80px", marginBottom: "80px" }}>
            <div className="row">
                {/* IMAGE on LEFT side */}
                <div className="col-6" style={{ padding: "20px" }}>
                    <img src={imageURL} alt={productName} style={{ width: "100%" }} />
                </div>
                {/* TEXT on RIGHT side */}
                <div className="col-6" style={{ padding: "30px", marginTop: "40px" }}>
                    <h1>{productName}</h1>
                    <p style={{ marginTop: "15px" }}>{productDescription}</p>
                    <div className="mt-3">
                        <a href={tryDemo || "#"}>Try Demo</a>
                        <a href={learnMore || "#"} style={{ marginLeft: "50px" }}>
                            Learn More</a>
                    </div>
                    <div className="mt-3">
                        <a href={googlePlay || "#"}>
                            <img src="media/images/googlePlayBadge.svg" alt="Google Play Badge" />
                        </a>
                        <a href={appStore || "#"}>
                            <img src="media/images/appstoreBadge.svg"
                                alt="App Store Badge"
                                style={{ marginLeft: "20px" }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;