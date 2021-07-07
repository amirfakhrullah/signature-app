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
                <h2>Welcome Back {userData.emailName}!</h2>
                <div className="info-container">
                    <p>Name: {userData.name}</p>
                    <p>Designation: {userData.position}</p>
                    <p>Email: {userData.email}</p>
                    <p>Contact No: {userData.phone}</p>
                </div>

                <div className="button-container">
                    <Button className="button-email result-page-button secondary-button" onClick={() => window.location.href = '/'}>Back to Home</Button>
                    <Button className="button-email result-page-button" onClick={() => history.push(`/user/${userData._id}`)}>Get Signature</Button>
                </div>

                <div>
                    <p style={{fontSize: '14px'}}>* If there's a problem with your information,<br /> contact Amir directly at amir@imanshoppe.com</p>
                </div>
            </div>
        );
    } else if (status === 'failed') {
        content = (<FailPage />);
    };

    return <React.Fragment>{content}</React.Fragment>;
}
