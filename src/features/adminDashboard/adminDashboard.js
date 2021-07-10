import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './adminDashboard.css';

import LoadingPage from '../loadingPage/loadingPage';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

import { Input } from '@material-ui/core';

import { Button } from 'semantic-ui-react';

import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import Dropdown from 'react-bootstrap/Dropdown';

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
        setId(decoded._id);
        setEmail(decoded.email);
        setUserId(decoded.userId);
        dispatch(userAction.fetchAllUsers());
    }, [dispatch]);

    const { allUsers } = useSelector(state => state.user);
    const { status } = useSelector(state => state.user);
    const adminInfo = allUsers.filter(user => user._id === userId);

    var content;
    if (status === 'loading' || status === 'idle') {
        content = <LoadingPage />
    } else if (status === 'succeed') {
        content = (
            <div>
                <div className="header-admin">
                    <img
                        src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1566/https://imanmedia.com.my/wp-content/uploads/2021/06/IMAN21_LogoAlternate.png"
                        width="130"
                        alt="logoIman"
                        style={{ marginLeft: '1vw' }}
                    />
                    {
                        adminInfo[0] && (
                            <>
                                {/* <PersonIcon style={{ color: 'white', textAlign: 'center', fontSize: '25px' }} />
                                    <p style={{ color: 'white', marginLeft: '10px', marginRight: '20px' }}>{adminInfo[0].emailName}</p> */}
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="logout-btn" style={{ display: 'flex', alignItems: 'center' }}>
                                        <PersonIcon style={{ color: 'white', textAlign: 'center', fontSize: '25px' }} />
                                        <p className="admin-name" style={{ color: 'white', marginLeft: '10px' }}>{adminInfo[0].emailName}</p>
                                        <ArrowDropDownIcon style={{ color: 'white', textAlign: 'center', fontSize: '25px' }} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ backgroundColor: '#F90084', zIndex: '45', display: 'flex', flexDirection: 'column' }}>
                                        <Dropdown.Item className="dropdown-menu" onClick={() => history.push(`/admin/update-user/${userId}`)}>Update Info</Dropdown.Item>
                                        <Dropdown.Item className="dropdown-menu" onClick={() => history.push(`/admin/update-password/${id}`)}>Update Password</Dropdown.Item>
                                        <Dropdown.Item className="dropdown-menu" onClick={() => Logout()}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        )
                    }
                </div>
                <h1 style={{ color: '#080A52', margin: '20px' }}>Employee Database</h1>
                <div>
                    <Input className="input-material-ui" style={{ color: 'black', width: '95%', margin: '20px 20px 0px 20px' }} type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for name.." title="Type in a name" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className="logout-btn"
                        style={{ border: '2px solid #F90084', margin: '20px', display: 'flex', alignItems: 'center' }}
                        onClick={() => history.push('/admin/create-user')}
                    >
                        <AddIcon style={{ fontSize: '20px' }} />
                        Add Employee
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="fullname">Full Name</th>
                            <th className="emailName">Short Name</th>
                            <th className="position">Designation</th>
                            <th className="email">Email</th>
                            <th className="phone">Phone Number</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody id="myUl">
                        {
                            allUsers && allUsers.map(user => (
                                <tr key={user._id} className="myRow">
                                    <td className="fullname">{user.name}</td>
                                    <td className="emailName">{user.emailName}</td>
                                    <td className="position">{user.position}</td>
                                    <td className="email">{user.email}</td>
                                    <td className="phone">{user.phone}</td>
                                    <td><button className="btn-table" onClick={() => history.push(`/admin/update-user/${user._id}`)}>Update</button></td>
                                    <td><button className="btn-table" onClick={() => history.push(`/admin/delete-user/${user._id}`)}>Delete</button></td>
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
