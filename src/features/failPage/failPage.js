import React from 'react';
import './failPage.css';

import { Button } from 'semantic-ui-react';

export default function FailPage() {
    return (
        <div className="failPage">
            <h2>No Result Found!</h2>
            <Button className="button-email home-button" onClick={() => window.location.href='/'}>Back to Home</Button>
        </div>
    )
}
