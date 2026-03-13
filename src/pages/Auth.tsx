import React from 'react';
import Login from '../components/auth/Login';
import OTP from '../components/auth/OTP';

const Auth = (props: { type: 'login' | 'otp' } = { type: 'login' }) => {
    return (
        <div className='flex w-full justify-center'>
            <div className="grid md:grid-cols-12 rounded-lg border h-110 w-full max-w-200">

                <div className="hidden md:flex col-span-5 justify-center items-center p-6 border-r">
                    <img src="/demo_image.png" alt="demo_img" />
                </div>

                <div className="col-span-12 md:col-span-7">
                    {props.type === 'login' ? <Login /> : <OTP />}
                </div>

            </div>
        </div>
    );
}

export default Auth;
