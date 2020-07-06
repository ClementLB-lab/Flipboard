import React from 'react';

var style = {
    backgroundColor: "#212121",
    borderTop: "1px solid #212121",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "6vh",
    width: "100%",
}

var text = {
    color: "#ffffff",
}

function Footer({ children }) {
    return (
        <div>
            <div style={style}>
                { children }
                <p>
                    <a style={text} href="#">Se connecter</a> . 
                    <a style={text} href="#">Qui sommes-nous</a> . 
                    <a style={text} href="#">Publishers</a> . 
                    <a style={text} href="/help">Aide</a>
                </p>
                <p style={text}>Flipboard &copy; 2020</p>
            </div>
        </div>
    )
}

export default Footer
