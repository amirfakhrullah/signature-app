import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchPage from './features/searchPage/searchPage';
import ResultPage from './features/resultPage/resultPage';
import SignaturePage from './features/signaturePage/signaturePage';
import AdminLoginPage from './features/adminLoginPage/adminLoginPage';
import AdminDashboard from './features/adminDashboard/adminDashboard';
import AddEmployeePage from './features/addEmployeePage/addEmployeePage';
import UpdateEmployeePage from './features/updateEmployeePage/updateEmployeePage';
import DeleteEmployeePage from './features/deleteEmployeePage/deleteEmployeePage';
import UpdatePasswordPage from './features/updatePasswordPage/updatePasswordPage';
import CreateAdminPage from './features/createAdminPage/createAdminPage';
import RemoveAdminPage from './features/removeAdminPage/removeAdminPage';
import ResetPasswordPage from './features/resetPasswordPage/resetPasswordPage';


export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path={'/'}>
          <SearchPage />
        </Route>
        <Route exact path={'/result'}>
          <ResultPage />
        </Route>
        <Route path={'/user/:id'}>
          <SignaturePage />
        </Route>
        <Route path={'/admin/login'}>
          <AdminLoginPage />
        </Route>
        <Route path={'/admin/dashboard'}>
          <AdminDashboard />
        </Route>
        <Route path={'/admin/create-user'}>
          <AddEmployeePage />
        </Route>
        <Route path={"/admin/update-user/:id"} component={UpdateEmployeePage} />
        <Route path={"/admin/delete-user/:id"} component={DeleteEmployeePage} />
        <Route path={'/admin/update-password'}>
          <UpdatePasswordPage />
        </Route>
        <Route path={"/admin/create-admin/:id"} component={CreateAdminPage} />
        <Route path={"/admin/remove-admin/:id"} component={RemoveAdminPage} />
        <Route path={'/reset'}>
          <ResetPasswordPage />
        </Route>
      </Switch>
    </Router>
  )
};