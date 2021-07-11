import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';
import './addEmployeePage.css'

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

export default function AddEmployeePage() {

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
        setId(decoded._id);
        setEmail(decoded.email);
        setUserId(decoded.userId);
        dispatch(userAction.fetchUserByEmail(email))
    }, [dispatch, email]);

    const adminInfo = useSelector(state => state.user.userData);
    const { status } = useSelector(state => state.user);
    const { message } = useSelector(state => state.user);
    const { errorMessage } = useSelector(state => state.user);

    var content;
    if (status === 'loading' | status === 'idle') {
        content = <LoadingPage />
    } else {
        content = (
            <div>
                <AdminHeader adminInfo={adminInfo} id={id} email={email} userId={userId} />
                <div className="form-container">
                    <h2 style={{ margin: '20px', color: '#080A52' }}>Add New Employee</h2>
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
                    <Formik
                        initialValues={{
                            name: '',
                            emailName: '',
                            email: '',
                            position: '',
                            phone: ''
                        }}
                        onSubmit={(values) => {
                            dispatch(userAction.createUser({
                                name: values.name,
                                emailName: values.emailName,
                                email: values.email,
                                position: values.position,
                                phone: values.phone
                            }))
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <Form>
                                <Form.Field>
                                    <input
                                        name="name"
                                        placeholder='Full Name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                </Form.Field>

                                <Form.Field>
                                    <input
                                        name="emailName"
                                        placeholder='Short Name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.emailName} />
                                </Form.Field>

                                <Form.Field>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder='Email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} />
                                </Form.Field>

                                <Form.Field>
                                    <input
                                        name="position"
                                        placeholder='Designation'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.position} />
                                </Form.Field>

                                <Form.Field>
                                    <input
                                        name="phone"
                                        placeholder='Phone Number'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone} />
                                </Form.Field>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button className="cancel__btn" onClick={() => window.location.href = '/admin/dashboard'}>Back</Button>

                                    <Button
                                        className="create__btn"
                                        type='submit'
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >Create Employee</Button>
                                </div>

                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        )
    }

    return <React.Fragment>{content}</React.Fragment>
}
