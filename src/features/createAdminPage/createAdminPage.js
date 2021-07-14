import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import * as authAction from '../../redux/actions/authAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import * as yup from 'yup';

export const formSchema = yup.object({
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});


export default function CreateAdminPage({ match }) {

    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    const [adminPassword, setAdminPassword] = useState('');

    const generateRandomString = () => {
        return Math.random().toString(36).slice(-10);
    }

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
        setAdminPassword(generateRandomString())
        dispatch(userAction.fetchUserByEmail(email))
        dispatch(userAction.fetchUserById(match.params.id))
    }, [dispatch, email, match.params.id]);

    const adminInfo = useSelector(state => state.user.userData);
    const { status } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.auth);
    const user = useSelector(state => state.user.userEditData);
    const { message } = useSelector(state => state.auth);
    const { errorMessage } = useSelector(state => state.auth);

    var content;
    if ((status === 'loading' | status === 'idle') && (loading === 'loading' | loading === 'idle')) {
        content = <LoadingPage />
    } else {
        content = (
            <div>
                <AdminHeader adminInfo={adminInfo} id={id} email={email} userId={userId} />
                <div className="form-container">
                    <h2 style={{ color: '#080A52' }}>Set Password for New Admin:</h2>
                    <p style={{ margin: '10px 2px 5px 2px' }}>{user.email}</p>
                    <p style={{ fontSize: '14px', margin: '10px 2vw 20px 2vw', textAlign: 'center'}}>You can type-in the password or use the given password.<br />The password will be sent to the new admin via email.</p>
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
                            password: `${adminPassword}`
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(authAction.registerAdmin({
                                id: user._id,
                                email: user.email,
                                password: values.password
                            }))
                            dispatch(userAction.fetchUserById(user.id))
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
                                {
                                    !message && (
                                        <>
                                            <p className="label__input">Password</p>
                                            <p className="fail-p">{errors.password && touched.password && errors.password}</p>
                                            <Form.Field>
                                                <input
                                                    name="password"
                                                    placeholder='Password'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password} />
                                            </Form.Field>
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
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                            >Confirm</Button>
                                        )
                                    }
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
