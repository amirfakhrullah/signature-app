import React, { useEffect } from 'react';
import './signaturePage.css';

import { useSelector } from 'react-redux';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import { Button } from 'semantic-ui-react';

export default function SignaturePage() {

    const status = useSelector(state => state.user.status);
    const userData = useSelector(state => state.user.userData);

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    // logic to copy text/html
    function copyDivToClipboard() {
        var range = document.createRange();
        range.selectNode(document.getElementById("copy-signature"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        alert('Email signature copied ')
    }

    useEffect(() => {
        if (status === 'idle') {
            window.location.href = '/';
        }
    });

    const sign = (
        <div id="copy-signature">
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontSize: '1.2em' }}>
                {userData.name && titleCase(userData.name)}
            </h3>
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontWeight: '500' }}>
                {userData.position && titleCase(userData.position)}
            </h3>
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontWeight: '500' }}>
                IMAN Media Group Sdn Bhd
            </h3>
            <a href="https://imanmedia.com.my" target="_blank" rel="noreferrer" >
                <img
                    src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                    width="150"
                    style={{ margin: '0' }}
                    alt="logoIman"
                />
            </a>
            <p style={{ marginTop: '0', fontSize: '16px', fontFamily: 'calibri', fontWeight: '500' }}>
                Phone: +6{userData.phone}
            </p>
            <p style={{ marginTop: '0', fontSize: '16px', fontFamily: 'calibri', fontWeight: '500' }}>
                Office:
                <a
                    href="https://www.google.com/maps/dir//iman+media+group/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x31cdcb8b8eebb2c5:0x2b39c280a7f87690?sa=X&ved=2ahUKEwj_1MWUhIrxAhV2zTgGHceuCTkQ9RcwDHoECDAQAw"
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'black' }}
                    rel="noreferrer"
                > Kajang, Selangor, Malaysia</a>
            </p>
        </div>
    )

    return (
        <div className='signaturePage'>
            <h2>Here's Your Email Signature:</h2>
            <div className="signature-container">
                {userData.name && <React.Fragment>{sign}</React.Fragment>}
            </div>
            <div className="copy-button">
                <p>Click to copy signature =&gt;</p>
                <div className="copy-icon" onClick={copyDivToClipboard}>
                    <FileCopyIcon style={{color: 'white'}} className="copy-icon-svg" />
                </div>
            </div>
            <Button className="button-email result-page-button email-signature-page-home-button" onClick={() => window.location.href = '/'}>Back to Login</Button>
        </div>
    )
}
