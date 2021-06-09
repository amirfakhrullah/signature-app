import React from 'react';
import './searchPage.css';

import { useHistory } from 'react-router-dom';

import { useState } from 'react';

import { useDispatch } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import SearchIcon from '@material-ui/icons/Search';

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

    const handleTextChange = (e) => {
        setSearchItem(e.target.value);
    }

    return (
        <div className="searchPage">
            <img
                src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                width="300"
            />
            <div className="searchContainer">
                <p className="typeInEmail">Type-in your e-mail to get your E-mail Signature</p>
                <div className="searchbar">
                    <SearchIcon />
                    <label>
                        <input type="text" id="search" placeholder="search..." onChange={handleTextChange} value={searchItem} onKeyPress={handleKeyPress} />
                    </label>
                </div>
            </div>
        </div>
    )
}
