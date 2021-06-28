import React from 'react';
import './searchPage.css';

import { useHistory } from 'react-router-dom';

import { useState } from 'react';

import { useDispatch } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { Button, Form } from 'semantic-ui-react';

export default function SearchPage(props) {
    const dispatch = useDispatch();

    const history = useHistory();

    const [searchItem, setSearchItem] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch(userAction.fetchUserByEmail(searchItem))
            setSearchItem('');
            history.push('/result');
        };
    };
    const handleClick = () => {
        dispatch(userAction.fetchUserByEmail(searchItem))
        setSearchItem('');
        history.push('/result');
    }

    const handleTextChange = (e) => {
        setSearchItem(e.target.value);
    }

    return (
        <div className="searchPage">
            <img
                src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                width="300"
                alt="logoIman"
            />
            <div className="searchContainer">
                <h2 className="typeInEmail">Welcome to Signature App</h2>
                <p className="typeInEmail">Type-in your ImanShoppe Email to get your Signature</p>
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
            </div>
        </div>
    )
}
