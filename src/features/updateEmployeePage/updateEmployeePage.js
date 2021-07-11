import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function UpdateEmployeePage({ match }) {

    const dispatch = useDispatch();
    const history = useHistory();

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
        history.push(`/admin/update-user/${match.params.id}`)
        dispatch(userAction.fetchUserByEmail(email))
        dispatch(userAction.fetchUserById(match.params.id))
        history.push(`/admin/update-user/${match.params.id}`)
    }, [dispatch, email, match.params.id, history]);

    const adminInfo = useSelector(state => state.user.userData);
    const { status } = useSelector(state => state.user);
    const user = useSelector(state => state.user.userEditData);
    const { message } = useSelector(state => state.user);
    const { errorMessage } = useSelector(state => state.user);

    var content;
    if (!user.email | status==='loading') {
        content = <LoadingPage />
    } else  {
        content = (
            <div>
                <AdminHeader adminInfo={adminInfo} id={id} email={email} userId={userId} />
                <div className="form-container">
                    <h2 style={{ margin: '20px', color: '#080A52' }}>Edit {user.emailName}'s Info</h2>
                    {
                        message && (
                            <div className="success__message">
                                <p>{message}. Please reload the page to see the updated changes</p>
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
                            name: `${user.name}`,
                            emailName: `${user.emailName}`,
                            email: `${user.email}`,
                            position: `${user.position}`,
                            phone: `${user.phone}`
                        }}
                        onSubmit={(values) => {
                            dispatch(userAction.updateUser({
                                id: user._id,
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
                                    >Update Employee</Button>
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
