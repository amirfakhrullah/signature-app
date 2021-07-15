import React, { useEffect, useState } from 'react';
import './adminDashboard.css';

import LoadingPage from '../loadingPage/loadingPage';
import AdminHeader from '../adminHeader/adminHeader';

import PersonIcon from '@material-ui/icons/Person';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import * as authAction from '../../redux/actions/authAction';


import { Input } from '@material-ui/core';

import { Button } from 'semantic-ui-react';

import AddIcon from '@material-ui/icons/Add';

var Buffer = require('buffer/').Buffer;

// Code for decoding JWT token without library
export const decodeToken = token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    const payload = JSON.parse(payloadinit);
    return payload;
}

export default function AdminDashboard() {

    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');


    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUl");
        li = ul.getElementsByClassName("myRow");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("td")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (!token) {
            window.location.href = '/admin/login';
            return;
        };

        const decoded = decodeToken(token);
        if (decoded.exp < (Date.now() / 1000)) {
            window.localStorage.removeItem('token');
            window.location.href = '/admin/login'
        }

        setId(decoded._id);
        setEmail(decoded.email);
        setUserId(decoded.userId);
        dispatch(userAction.fetchAllUsers());
        dispatch(authAction.fetchAllAdmins());
    }, [dispatch]);


    const { allUsers } = useSelector(state => state.user);
    const { status } = useSelector(state => state.user);
    const { allAdmins } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.auth);
    const adminInfo = allUsers.filter(user => user._id === userId);

    var content;
    if (status === 'loading' | loading === 'loading') {
        content = <LoadingPage />
    } else if (status === 'succeed' && loading === 'success') {
        content = (
            <div>
                <AdminHeader adminInfo={adminInfo[0]} id={id} userId={userId} email={email} />
                <h1 style={{ color: '#080A52', margin: '20px', marginTop: '80px' }}>Employee Database</h1>
                <div>
                    <Input className="input-material-ui" style={{ color: 'black', width: '95%', margin: '20px 20px 0px 20px' }} type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for name.." title="Type in a name" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="logout-btn"
                        style={{ border: '2px solid #F90084', margin: '20px', display: 'flex', alignItems: 'center' }}
                        onClick={() => window.location.href = '/admin/create-user'}
                    >
                        <AddIcon style={{ fontSize: '20px' }} />
                        Add Employee
                    </Button>
                </div>
                <table>
                    <thead style={{ position: 'sticky', top: '58px', backgroundColor: 'white', zIndex: '1' }}>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th className="fullname">Full Name</th>
                            <th className="emailName">Short Name</th>
                            <th className="position">Designation</th>
                            <th className="email">Email</th>
                            <th className="phone">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody id="myUl">
                        {
                            allUsers && allUsers.map(user => (
                                <tr key={user._id} className="myRow">
                                    <td><button className="btn-table" onClick={() => window.location.href = `/admin/update-user/${user._id}`}>Edit</button></td>
                                    <td><button className="btn-table" onClick={() => window.location.href = `/admin/delete-user/${user._id}`}>Delete</button></td>
                                    <td className="fullname">{user.name} {allAdmins.find(admin => admin.userId === user._id) && <PersonIcon text="Admin" style={{ fontSize: '15px', position: 'relative', top: '2px' }} />}</td>
                                    <td className="emailName">{user.emailName} {allAdmins.find(admin => admin.userId === user._id) && <PersonIcon style={{ fontSize: '15px', position: 'relative', top: '2px' }} />}</td>
                                    <td className="position">{user.position}</td>
                                    <td className="email">{user.email} {allAdmins.find(admin => admin.userId === user._id) && <PersonIcon text="Admin" style={{ fontSize: '15px', position: 'relative', top: '2px' }} />}</td>
                                    <td className="phone">{user.phone}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
