import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login()
{
    const history = useHistory();
    const goHome = () => history.push("/");

    return (
        <div>
            <span>
                <button onClick={goHome}>Page d'accueil</button>
            </span>
        </div>
    );
}