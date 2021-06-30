import React, { useEffect } from 'react';
import './resultPage.css';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


import LoadingPage from '../loadingPage/loadingPage';
import FailPage from '../failPage/failPage';

import { Button } from 'semantic-ui-react';


export default function ResultPage() {

    const history = useHistory();

    const userData = useSelector(state => state.user.userData);
    const status = useSelector(state => state.user.status);

    function titleCase(str) {
        if (str === "Chief Executive Officer of IMAN Publication" | str === "Senior E-Commerce Executive / Product Manager ISB" | str === "Senior Operation B2C Executive" | str === "IT Executive" | str === "E-Commerce Fulfillment" | str === "Head of HR and Admin Department") {
            return str;
        }
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    useEffect(() => {
        if (status === 'idle') {
            window.location.href = '/';
        }
    });


    let content;

    if (status === 'loading') {
        content = (<LoadingPage />);
    } else if (status === 'succeed') {
        content = (
            <div className='resultPage'>
                <h2>Welcome Back {titleCase(userData.name)} !</h2>
                <div className="info-container">
                    <p>Name: {titleCase(userData.name)}</p>
                    <p>Designation: {titleCase(userData.position)}</p>
                    <p>Email: {userData.email}</p>
                    <p>Contact No: {userData.phone}</p>
                </div>

                <div className="button-container">
                    <Button className="button-email result-page-button secondary-button" onClick={() => window.location.href = '/'}>Back to Home</Button>
                    <Button className="button-email result-page-button" onClick={() => history.push(`/user/${userData._id}`)}>Get Signature</Button>
                </div>
            </div>
        );
    } else if (status === 'failed') {
        content = (<FailPage />);
    };

    return <React.Fragment>{content}</React.Fragment>;
}
