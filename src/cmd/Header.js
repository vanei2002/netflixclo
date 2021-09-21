import React from "react";
import "./Header.css";

export default({black}) =>{

    return(

        <header className={black ? 'black' : ' '}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png" alt="Netflix"/>
                </a>
            </div>

            <div className="header-user">
                <a href="" >
                    <img src="data:image/jpeg;base64,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" alt="Usuario"/>
                </a>

            </div>
        </header>
    );
}