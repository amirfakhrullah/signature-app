import React, { useState, useEffect } from 'react';

import { Button, Form } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../../redux/actions/authAction';

import LoadingPage from '../loadingPage/loadingPage';

export default function ResetPasswordPage() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');

    const handleClick = () => {
        dispatch(authAction.resetPassword(email));
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleClick()
        };
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            window.location.href = '/admin/dashboard'
        }
    });

    const { errorMessage } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.auth);

    var content;
    if (loading === 'loading') {
        content = <LoadingPage />
    } else {
        content = (
            <div className="searchPage" style={{ marginTop: '10vh' }}>
                {
                    errorMessage && <h2 className="error-message">{errorMessage}</h2>
                }
                {
                    message && <h2 className="error-message">{message}</h2>
                }
                <div className="searchContainer">
                    <h2 className="typeInEmail">Reset Password</h2>
                    <p className="typeInEmail">Type in your email to reset the password</p>
                    <Form>
                        <Form.Field>
                            <input
                                className="form-email"
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                                onKeyPress={handleKeyPress} />
                        </Form.Field>
                        <Button className="button-email" onClick={() => handleClick()}>Send</Button>
                    </Form>
                    <p className="return-btn">Not an admin? <span onClick={() => window.location.href = '/'}>Back to home</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
