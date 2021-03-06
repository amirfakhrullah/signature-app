import React, { useState, useEffect } from 'react';
import './adminLoginPage.css';

import { useHistory } from 'react-router-dom';

import { Button, Form } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../../redux/actions/authAction';

import LoadingPage from '../loadingPage/loadingPage';

export default function AdminLoginPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleClick = () => {
        dispatch(authAction.loginUser({ email, password }))
            .then(result => {
                if (result.success) {
                    try {
                        window.localStorage.setItem('token', result.token);
                        history.push('/admin/dashboard');
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    history.push('/admin/login');
                }
            })
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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            window.location.href = '/admin/dashboard'
        }
    });

    const { errorMessage } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.auth);

    var content;
    if (loading === 'loading') {
        content = <LoadingPage />
    } else {
        content = (
            <div className="searchPage">
                <img
                    src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                    width="300"
                    alt="logoIman"
                />
                {
                    errorMessage && <h2 className="error-message">{errorMessage}</h2>
                }
                <div className="searchContainer">
                    <h2 className="typeInEmail">Admin Login</h2>
                    <p className="typeInEmail">Section to update the database (Only for Admin)</p>
                    <Form>
                        <Form.Field>
                            <input
                                className="form-email"
                                placeholder='Email'
                                value={email}
                                onChange={handleEmailChange}
                                onKeyPress={handleKeyPress} />
                        </Form.Field>
                        <Form.Field>
                            <input
                                className="form-email"
                                placeholder='Password'
                                type="password"
                                onChange={handlePasswordChange}
                                value={password}
                                onKeyPress={handleKeyPress} />
                        </Form.Field>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <p className="return-btn"><span onClick={() => window.location.href='/reset'}>Forgot password?</span></p>
                        </div>
                        <Button className="button-email" onClick={() => handleClick()}>Login</Button>
                    </Form>
                    <p className="return-btn">Not an admin? <span onClick={() => window.location.href = '/'}>Back to home</span></p>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
