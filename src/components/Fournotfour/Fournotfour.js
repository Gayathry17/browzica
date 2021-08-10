import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Helmet from 'react-helmet'

import './Fournotfour.css'
 

function Fournotfour() {
    let history = useHistory();
 
    function handleClick1() {
        history.push("/");
      }
    return (
        <div className="fnf">
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
           
            <div className="fnf-description">
                <h1>404</h1>
                <h2>UH OH! You're lost.</h2>
                <Button onClick={handleClick1}>Back to Home</Button>
            </div>
        </div>
    )
}

export default Fournotfour
