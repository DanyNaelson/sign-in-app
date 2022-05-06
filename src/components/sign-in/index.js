import React from 'react'
import { JefaLogo } from '../../svg'
import SignInForm from './sign-in-form'
import './index.less'

const SignIn = () => {
    return (
        <div id='sections-container'>
            <JefaLogo id='logo' />
            <SignInForm />
        </div>
    )
}

export default SignIn