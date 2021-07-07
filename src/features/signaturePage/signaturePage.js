import React, { useEffect } from 'react';
import './signaturePage.css';

import { useSelector } from 'react-redux';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import { Button } from 'semantic-ui-react';

export default function SignaturePage() {

    const status = useSelector(state => state.user.status);
    const userData = useSelector(state => state.user.userData);

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

    // logic to add space in phone number
    const editPhoneNo = (no) => {
        return [no.slice(0, 7), ' ', no.slice(7)].join('')
    }

    useEffect(() => {
        if (status === 'idle') {
            window.location.href = '/';
        }
    });

    const sign = (
        <div id="copy-signature">
            <p className="px16">{userData.emailName && userData.emailName}</p>
            <p className="px14">{userData.position && userData.position}</p>
            <p className="px14">IMAN Media Group Sdn. Bhd.</p>
            <a href="https://imanmedia.com.my" target="_blank" rel="noreferrer" >
                <img className="logo-iman-signature" src="https://imanmedia.com.my/wp-content/uploads/2021/06/IMAN21_logoemelArtboard-99-copy-7@3x.png" alt="logo" width="200px" />
            </a>

            <hr className="pink1" />

            <div className="mid-container">
                <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/phone-con-removebg-preview.png" alt="phone-icon" className="icon-material-ui1" />
                <p className="px11">03-8940 7284 | {userData.phone && editPhoneNo(userData.phone)}</p>
            </div>

            <div className="mid-container">
                <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/email-con-removebg-preview.png" alt="email-icon" className="icon-material-ui1" />
                <p className="px11" style={{color: '#080A52 !important', textDecoration: 'none !important', pointerEvents: 'none'}}>{userData.email}</p>
            </div>

            <div className="mid-container">
                <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/web-con-removebg-preview.png" alt="email-icon" className="icon-material-ui1" />
                <p className="px11" style={{color: '#080A52 !important', textDecoration: 'none !important', pointerEvents: 'none'}}>imanmedia.com.my</p>
            </div>

            <div className="mid-container">
                <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/location-con-removebg-preview.png" alt="location-icon" className="icon-material-ui1" />
                <a
                    href="https://www.google.com/maps/dir//iman+media+group/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x31cdcb8b8eebb2c5:0x2b39c280a7f87690?sa=X&ved=2ahUKEwj_1MWUhIrxAhV2zTgGHceuCTkQ9RcwDHoECDAQAw"
                    target="_blank"
                    style={{ textDecoration: 'none', pointerEvents: 'none' }}
                    rel="noreferrer"
                ><p className="px11">12, Jalan Industri Kidamai 2/1,<br />Taman Industri Kidamai 2,<br />43000 Kajang, Selangor</p>
                </a>
            </div>

            <hr className="pink2" />

            <div className="bottom-container">
                <a href="https://www.youtube.com/user/ImanShoppe" target="_blank" rel="noreferrer">
                    <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/yt-con-removebg-preview.png" alt="youtube-icon" className="icon-material-ui2" />
                </a>
                <a href="https://twitter.com/imanpublication?lang=en" target="_blank" rel="noreferrer">
                    <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/twt-con-removebg-preview.png" alt="twitter-icon" className="icon-material-ui2" />
                </a>
                <a href="https://www.facebook.com/imanmediagroup/" target="_blank" rel="noreferrer">
                    <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/fb-con-1.png" alt="fb-icon" className="icon-material-ui2" />
                </a>
                <a href="https://www.instagram.com/imanmediagroup/?hl=en" target="_blank" rel="noreferrer">
                    <img src="https://imanmedia.com.my/wp-content/uploads/2021/06/ig-con-removebg-preview.png" alt="fb-icon" className="icon-material-ui2" />
                </a>
            </div>
        </div>
    )

    return (
        <div className='signaturePage'>
            <h2>Here's Your Email Signature:</h2>
            <p style={{paddingBottom: '20px', marginLeft: '10px'}}>Guides to set email signature on Gmail: <a href="https://docs.google.com/document/d/1MZEioYLH0vc3292zlU-V2QWyYVdPrul0Io7l8XTQ-Hs/edit?usp=sharing" 
                target="_blank" 
                rel="noreferrer"
                style={{fontWeight: 'bold', textDecoration: 'underline'}} >Click here</a></p>
            <div className="signature-container">
                {userData.name && <React.Fragment>{sign}</React.Fragment>}
            </div>
            <div className="copy-button">
                <p>Click to copy signature =&gt;</p>
                <div className="copy-icon" onClick={copyDivToClipboard}>
                    <FileCopyIcon style={{ color: 'white' }} className="copy-icon-svg" />
                </div>
            </div>
            <Button className="button-email result-page-button email-signature-page-home-button" onClick={() => window.location.href = '/'}>Back to Home</Button>
        </div>
    )
}
