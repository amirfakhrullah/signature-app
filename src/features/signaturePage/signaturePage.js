import React from 'react';

import { useSelector } from 'react-redux';

export default function SignaturePage() {
    const userData = useSelector(state => state.user.userData);

    return (
        <div className='signaturePage'>
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontSize: '1.2em' }}>
                {userData.name}
            </h3>
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontWeight: '500' }}>
                {userData.position}
            </h3>
            <h3 style={{ color: 'grey', margin: '0', fontFamily: 'calibri', fontWeight: '500' }}>
                IMAN Media Group Sdn Bhd
            </h3>
            <a href="https://imanmedia.com.my" target="_blank" rel="noreferrer" >
                <img
                    src="https://imanpublication.com/wp-content/uploads/2021/06/logo-iman-21-signature.png"
                    width="150"
                    style={{ margin: '0' }}
                    alt="logoIman"
                />
            </a>
            <p style={{ marginTop: '0', fontSize: '16px', fontFamily: 'calibri', fontWeight: '500' }}>
                Phone: +6{userData.phone}
            </p>
            <p style={{ marginTop: '0', fontSize: '16px', fontFamily: 'calibri', fontWeight: '500' }}>
                Office:
                <a
                    href="https://www.google.com/maps/dir//iman+media+group/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x31cdcb8b8eebb2c5:0x2b39c280a7f87690?sa=X&ved=2ahUKEwj_1MWUhIrxAhV2zTgGHceuCTkQ9RcwDHoECDAQAw"
                    target="_blank"
                    style={{ textDecoration: 'none', color: 'black' }}
                > Kajang, Selangor, Malaysia</a>
            </p>
        </div>
    )
}
