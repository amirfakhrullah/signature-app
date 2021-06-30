import React from 'react';
import './test.css';

import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

export default function Test() {
    return (
        <div>
            <PhoneIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <MailOutlineIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <LanguageIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <LocationOnIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />

            <YouTubeIcon  className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <TwitterIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <FacebookIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
            <InstagramIcon className="icon-material-ui" style={{ fontSize: '100px', border: '1px solid black' }} />
        </div>
    )
}
