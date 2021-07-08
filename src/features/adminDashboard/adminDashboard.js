import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './adminDashboard.css';

import LoadingPage from '../loadingPage/loadingPage';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

var Buffer = require('buffer/').Buffer;

// Code for decoding JWT token without library
const decodeToken = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    return payload;
}

export default function AdminDashboard() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    const Logout = () => {
        try {
            window.localStorage.removeItem('token');
            window.location.href = '/admin/login';
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            window.location.href = '/';
            return;
        };

        const decoded = decodeToken(token);
        setId(decoded._id);
        setEmail(decoded.email);
        setUserId(decoded.userId);
        dispatch(userAction.fetchAllUsers());
    }, [dispatch]);

    const { allUsers } = useSelector(state => state.user);
    const { status } = useSelector(state => state.user);

    var content;
    if (status === 'loading' || status === 'idle') {
        content = <LoadingPage />
    } else if (status === 'succeed') {
        content = (
            <div>
                <h3>{id}</h3>
                <h3>{email}</h3>
                <h3>{userId}</h3>
                <h3 onClick={() => Logout()}>Logout</h3>
                {
                    allUsers && allUsers.map(user => (
                        <p>{user.name}</p>
                    ))
                }
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
