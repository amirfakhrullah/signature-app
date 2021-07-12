import React from 'react';
import './adminHeader.css';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';

import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';

export default function AdminHeader(props) {

    const history = useHistory();
    const dispatch = useDispatch();

    const Logout = () => {
        try {
            window.localStorage.removeItem('token');
            window.location.href = '/admin/login';
        } catch (error) {
            console.log(error)
        }
    }

    const getSignature = () => {
        dispatch(userAction.fetchUserByEmail(props.email))
            .then(result => {
                if (result[0]) {
                    history.push(`/user/${props.userId}`);
                }
            })
    }

    return (
        <div className="header-admin">
            <img
                src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1566/https://imanmedia.com.my/wp-content/uploads/2021/06/IMAN21_LogoAlternate.png"
                width="130"
                alt="logoIman"
                style={{ marginLeft: '1vw', cursor: 'pointer' }}
                onClick={() => window.location.href="/admin/dashboard"}
            />
            {
                props.adminInfo && (
                    <>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="logout-btn" style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon style={{ color: 'white', textAlign: 'center', fontSize: '25px' }} />
                                <p className="admin-name" style={{ color: 'white', marginLeft: '10px' }}>{props.adminInfo.emailName}</p>
                                <ArrowDropDownIcon style={{ color: 'white', textAlign: 'center', fontSize: '25px' }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ backgroundColor: '#F90084', zIndex: '45', display: 'flex', flexDirection: 'column' }}>
                                <Dropdown.Item className="dropdown-menu" onClick={() => getSignature()}>Get Signature</Dropdown.Item>
                                <Dropdown.Item className="dropdown-menu" onClick={() => window.location.href=`/admin/update-user/${props.userId}`}>Update Info</Dropdown.Item>
                                <Dropdown.Item className="dropdown-menu" onClick={() => window.location.href=`/admin/update-password`}>Update Password</Dropdown.Item>
                                <Dropdown.Item className="dropdown-menu" onClick={() => Logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                )
            }
        </div>
    )
}
