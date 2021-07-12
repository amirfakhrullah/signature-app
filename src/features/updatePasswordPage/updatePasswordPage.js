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

const formSchema = yup.object({
    password: yup.string().required('Current Password is required'),
    newPassword: yup
        .string()
        .required('New Password is required')
        .min(6, 'New Password must be at least 6 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

export default function UpdatePasswordPage() {

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
    }, [dispatch, email]);

    const adminInfo = useSelector(state => state.user.userData);
    const { status } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.auth);
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
                    <h2 style={{ margin: '20px', color: '#080A52' }}>Update Password</h2>
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
                            password: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(authAction.updatePassword({
                                id,
                                password: values.password,
                                newPassword: values.newPassword
                            }))
                            dispatch(userAction.fetchUserByEmail(email))
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
                                <p className="label__input">Current Password</p>
                                <p className="fail-p">{errors.password && touched.password && errors.password}</p>
                                <Form.Field>
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password} />
                                </Form.Field>

                                <p className="label__input">New Password</p>
                                <p className="fail-p">{errors.newPassword && touched.newPassword && errors.newPassword}</p>
                                <Form.Field>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        placeholder='New Password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.newPassword} />
                                </Form.Field>

                                <p className="label__input">Confirm New Password</p>
                                <p className="fail-p">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</p>
                                <Form.Field>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder='Confirm New Password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword} />
                                </Form.Field>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button className="cancel__btn" onClick={() => window.location.href = '/admin/dashboard'}>Back</Button>

                                    <Button
                                        className="create__btn"
                                        type='submit'
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >Confirm</Button>
                                </div>

                            </Form>
                        )}

                    </Formik>
                </div>
            </div>
        )
    };

    return <React.Fragment>{content}</React.Fragment>
}
