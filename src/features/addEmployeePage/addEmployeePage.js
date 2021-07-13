import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';
import './addEmployeePage.css'

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import * as yup from 'yup';

export const formSchema = yup.object({
    name: yup.string().required('Name is required'),
    emailName: yup.string().required('Short Name is required'),
    email: yup.string().email('Must be an email').required('Email is required'),
    position: yup.string().required('Designation is required'),
    phone: yup.string().required('Phone Number is required')
});

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
                        validationSchema={formSchema}
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
                                <p className="label__input">Email</p>
                                <p className="fail-p">{errors.email && touched.email && errors.email}</p>
                                <Form.Field>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder='@imanshoppe.com'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} />
                                </Form.Field>
                                
                                <p className="label__input">Full Name</p>
                                <p className="fail-p">{errors.name && touched.name && errors.name}</p>
                                <Form.Field>
                                    <input
                                        name="name"
                                        placeholder='Full Name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} />
                                </Form.Field>

                                <p className="label__input">Short Name</p>
                                <p className="fail-p">{errors.emailName && touched.emailName && errors.emailName}</p>
                                <Form.Field>
                                    <input
                                        name="emailName"
                                        placeholder='Short Name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.emailName} />
                                </Form.Field>

                                <p className="label__input">Designation</p>
                                <p className="fail-p">{errors.position && touched.position && errors.position}</p>
                                <Form.Field>
                                    <input
                                        name="position"
                                        placeholder='Designation'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.position} />
                                </Form.Field>

                                <p className="label__input">Phone Number</p>
                                <p className="fail-p">{errors.phone && touched.phone && errors.phone}</p>
                                <Form.Field>
                                    <input
                                        name="phone"
                                        placeholder='01x-xxxxxxx'
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
