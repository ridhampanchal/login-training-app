import React, { useState } from 'react';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../ui/input-otp"
import { Button } from '../ui/button';
import { useLocation } from "react-router-dom"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useNavigate } from "react-router-dom"

const OTP = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const userName = location.state?.userName ?? 'User';
    const [otp, setOtp] = useState("")

    return (
        <div className='w-full flex flex-col items-start justify-between px-8 py-12 h-full'>
            <div className='w-full'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    2-Factor Authentication
                </h2>
                <p className="leading-7">
                    Hi {userName}, please enter the 6 digit OTP sent to your email.
                </p>
            </div>
            <div className='w-full flex flex-col mt-10'>
                <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className='w-full mt-10'>
                <Button variant={'outline'} disabled={otp.length !== 6} size={'sm'} className={'w-full'}
                    onClick={() => {
                        navigate('/dashboard');
                    }}
                >
                    Verify OTP
                </Button>
            </div>
        </div>
    );
}

export default OTP;
