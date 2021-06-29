import React, { useEffect } from 'react';
import './signaturePage.css';

import { useSelector } from 'react-redux';

import FileCopyIcon from '@material-ui/icons/FileCopy';

import { Button } from 'semantic-ui-react';

import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

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
            <p className="px16">{userData.name && titleCase(userData.name)}</p>
            <p className="px14">{userData.position && titleCase(userData.position)}</p>
            <p className="px14">IMAN Media Group Sdn. Bhd.</p>
            <a href="https://imanmedia.com.my" target="_blank" rel="noreferrer" >
                <img className="logo-iman-signature" src="https://imanmedia.com.my/wp-content/uploads/2021/06/iman-signature.png" alt="logo" width="200px" />
            </a>

            <hr className="pink1" />

            <div className="mid-container">
                <PhoneIcon className="icon-material-ui" style={{ fontSize: '15px' }} />
                <p className="px11">03-8940 7284 | {userData.phone && editPhoneNo(userData.phone)}</p>
            </div>

            <div className="mid-container">
                <MailOutlineIcon className="icon-material-ui" style={{ fontSize: '15px' }} />
                <p className="px11">{userData.email}</p>
            </div>

            <div className="mid-container">
                <LanguageIcon className="icon-material-ui" style={{ fontSize: '15px' }} />
                <p className="px11">imanmedia.com.my</p>
            </div>

            <div className="mid-container">
                <LocationOnIcon className="icon-material-ui" style={{ fontSize: '15px' }} />
                <a
                    href="https://www.google.com/maps/dir//iman+media+group/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x31cdcb8b8eebb2c5:0x2b39c280a7f87690?sa=X&ved=2ahUKEwj_1MWUhIrxAhV2zTgGHceuCTkQ9RcwDHoECDAQAw"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    rel="noreferrer"
                ><p className="px11">12, Jalan Industri Kidamai 2/1,<br />Taman Industri Kidamai,<br />43200 Kajang, Selangor</p>
                </a>
            </div>

            <hr className="pink2" />

            <div className="bottom-container">
                <a href="https://www.youtube.com/user/ImanShoppe" target="_blank" rel="noreferrer">
                    <YouTubeIcon className="icon-material-ui2" style={{ fontSize: '20px' }} />
                </a>
                <a href="https://twitter.com/imanpublication?lang=en" target="_blank" rel="noreferrer">
                    <TwitterIcon className="icon-material-ui2" style={{ fontSize: '20px' }} />
                </a>
                <a href="https://www.facebook.com/imanmediagroup/" target="_blank" rel="noreferrer">
                    <FacebookIcon className="icon-material-ui2" style={{ fontSize: '20px' }} />
                </a>
                <a href="https://www.instagram.com/imanmediagroup/?hl=en" target="_blank" rel="noreferrer">
                    <InstagramIcon className="icon-material-ui2" style={{ fontSize: '20px' }} />
                </a>
            </div>
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
                    <FileCopyIcon style={{ color: 'white' }} className="copy-icon-svg" />
                </div>
            </div>
            <Button className="button-email result-page-button email-signature-page-home-button" onClick={() => window.location.href = '/'}>Back to Login</Button>
        </div>
    )
}
