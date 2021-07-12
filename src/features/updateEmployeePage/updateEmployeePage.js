import React, { useEffect, useState } from 'react';
import AdminHeader from '../adminHeader/adminHeader';

import { decodeToken } from '../adminDashboard/adminDashboard';

import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../../redux/actions/userAction';
import * as authAction from '../../redux/actions/authAction';
import LoadingPage from '../loadingPage/loadingPage';

import { Formik } from 'formik';
import { Button, Form } from 'semantic-ui-react';

import { formSchema } from '../addEmployeePage/addEmployeePage';

export default function UpdateEmployeePage({ match }) {

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
        dispatch(authAction.fetchAllAdmins());
        dispatch(userAction.fetchUserById(match.params.id))
    }, [dispatch, email, match.params.id]);

    const adminInfo = useSelector(state => state.user.userData);
    const { allAdmins } = useSelector(state => state.auth);
    const { status } = useSelector(state => state.user);
    const user = useSelector(state => state.user.userEditData);
    const { message } = useSelector(state => state.user);
    const { errorMessage } = useSelector(state => state.user);

    const isAdmin = allAdmins.find(admin => admin.userId === user._id);

    var content;
    if (!user.email | status === 'loading') {
        content = <LoadingPage />
    } else {
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
                        validationSchema={formSchema}
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
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    {
                                        isAdmin ? (
                                            <Button
                                                className="cancel__btn"
                                                style={{padding: '5px 10px'}}
                                            >Remove Admin</Button>
                                        ) : (
                                            <Button
                                                className="cancel__btn"
                                                style={{padding: '5px 10px'}}
                                            >Add Admin</Button>
                                        )
                                    }
                                </div>
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
