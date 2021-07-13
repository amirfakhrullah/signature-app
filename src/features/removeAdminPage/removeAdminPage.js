import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import * as authAction from '../../redux/actions/authAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Button } from 'semantic-ui-react';

export default function RemoveAdminPage({ match }) {

    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        if (!token) {
            window.location.href = "/admin/login"
        };

        const decoded = decodeToken(token);
        if (decoded.exp < (Date.now() / 1000)) {
            window.localStorage.removeItem('token');
            window.location.href = '/admin/login'
        }

        setId(decoded._id);
        setEmail(decoded.email);
        setUserId(decoded.userId);
        dispatch(userAction.fetchUserByEmail(email))
        dispatch(authAction.fetchAdminById(match.params.id))
    }, [dispatch, email, match.params.id]);

    const adminInfo = useSelector(state => state.user.userData);
    const adminDelete = useSelector(state => state.auth.adminData);
    const { status } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.auth);
    const { errorMessage } = useSelector(state => state.auth);

    const handleDelete = () => {
        dispatch(authAction.deleteAdmin(match.params.id))
    }

    var content;
    if ((status === 'loading' | status === 'idle') && (loading === 'loading' | loading === 'idle')) {
        content = <LoadingPage />
    } else {
        content = (
            <div>
                <AdminHeader adminInfo={adminInfo} id={id} email={email} userId={userId} />
                <div className="form-container">
                    {
                        message && (
                            <div className="success__message">
                                <p>{message}</p>
                            </div>
                        )
                    }
                    {
                        errorMessage && (
                            <div className="fail__message">
                                <p>{errorMessage}</p>
                            </div>
                        )
                    }
                    {
                        !message && (
                            <>
                                <p className="label__input" style={{ fontSize: '16px', margin: '20px 10px 10 10px', color: '#080A52' }}>Are you sure you want to remove</p>
                                <p className="label__input" style={{ fontSize: '16px', margin: '10px 10px 20px 10px', color: '#080A52' }}>{adminDelete.email} as Admin?</p>
                            </>
                        )
                    }


                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button className="cancel__btn" onClick={() => window.location.href = '/admin/dashboard'}>Back</Button>
                        {
                            !message && (
                                <Button
                                    className="create__btn"
                                    type='submit'
                                    onClick={() => handleDelete()}
                                >Confirm</Button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
