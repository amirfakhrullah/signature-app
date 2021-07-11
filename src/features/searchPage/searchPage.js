import React from 'react';
import './searchPage.css';

import { useHistory } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { Button, Form } from 'semantic-ui-react';

export default function SearchPage(props) {
    const dispatch = useDispatch();

    const history = useHistory();

    const [searchItem, setSearchItem] = useState('');

    const handleClick = () => {
        dispatch(userAction.fetchUserByEmail(searchItem))
        setSearchItem('');
        history.push('/result');
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleClick();
        };
    };

    const handleTextChange = (e) => {
        setSearchItem(e.target.value);
    };

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (token) {
            window.location.href='/admin/dashboard'
        }
    });

    return (
        <div className="searchPage">
            <img
                src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                width="300"
                alt="logoIman"
            />
            <div className="searchContainer">
                <h2 className="typeInEmail">Welcome to Signature App</h2>
                <p className="typeInEmail">Type-in your IMANShoppe Email to get your signature</p>
                <Form>
                    <Form.Field>
                        <input
                            className="form-email"
                            placeholder='Email'
                            onChange={handleTextChange}
                            value={searchItem}
                            onKeyPress={handleKeyPress} />
                    </Form.Field>
                    <Button className="button-email" onClick={handleClick}>Submit</Button>
                </Form>
                <p className="return-btn">To login as admin, <span onClick={() => window.location.href='/admin/login'}>Click here</span></p>
            </div>
        </div>
    )
}
