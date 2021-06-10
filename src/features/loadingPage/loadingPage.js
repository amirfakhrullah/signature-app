import React from 'react';
import logoiman from './logoiman.png';
import './loadingPage.css';



export default function LoadingPage() {
    return (
        <div className="loadingContainer">
            <h2>Loading. . .</h2>
            <img className="loaderIcon" src={logoiman} width='120em' />
        </div>
    )
}
