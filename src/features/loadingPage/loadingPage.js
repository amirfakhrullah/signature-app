/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
// import logoiman from './logoiman.png';
import logogif from './logoImanLoader.gif';
import './loadingPage.css';



export default function LoadingPage() {
    return (
        <div className="loadingContainer">
            {/* <h2>Loading. . .</h2> */}
            <img src={logogif} width="400px" />
            {/* <img className="loaderIcon" src={logoiman} width='120em' /> */}
        </div>
    )
}
