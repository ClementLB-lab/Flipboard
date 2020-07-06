import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Help()
{
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <div>
            <p>HELLO</p>
            <span>
                <button onClick={goHome}>Flipboard</button>
            </span>
        </div>
    );
}