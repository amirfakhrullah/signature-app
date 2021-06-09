import React from 'react';
import './resultPage.css';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ResultPage() {
    const history = useHistory();

    const userData = useSelector(state => state.user.userData);

    return (
        <div className='resultPage'>
            <h2>Result: </h2>
            <div className='result-with-button'>
                <div className='resultContainer'>
                    <div className='result'>
                        <p>{userData.name}</p>
                        <p>{userData.email}</p>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <a className='button-result' onClick={() => {
                    history.push(`/user/${userData._id}`)
                }}>Click</a>
            </div>
        </div>
    )
}
