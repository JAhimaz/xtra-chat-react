
import React from 'react';
import { Button } from 'react-bootstrap';
import { SignInBtn } from '../App';

import '../css/SignIn.css';

function SignInPage() {

    return (
        <div className="sign-in-panel">
            <p>Welcome to Xtra Chat, Please Sign In with Google</p>
            <SignInBtn />
        </div>
    );
}

export default SignInPage;