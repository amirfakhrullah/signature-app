import React from 'react';
import './resultPage.css';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingPage from '../loadingPage/loadingPage';
import FailPage from '../failPage/failPage';


export default function ResultPage() {
    const history = useHistory();

    const userData = useSelector(state => state.user.userData);
    const status = useSelector(state => state.user.status);

    let content;

    if (status === 'loading') {
        content = (<LoadingPage />);
    } else if (status === 'succeed') {
        content = (
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
                        <p className='button-result' onClick={() => {
                            history.push(`/user/${userData._id}`)
                        }}>Click</p>
                    </div>
                </div>
        );
    } else if (status === 'failed') {
        content = (<FailPage />);
    };

    return <React.Fragment>{content}</React.Fragment>;
}
