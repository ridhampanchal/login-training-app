import React from 'react';
import { Field, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from '../ui/button';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom"


const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        userName: Yup.string()
            .required("Username must not be empty.")
            .min(3, "Username must be atleast 3 characters long.")
            .max(15, "Username must be less than 15 characters in length.")
            .matches(
                /^[a-zA-Z0-9._]+$/,
                "Username can only contain letters, numbers, '.' and '_'"
            ),

        password: Yup.string()
            .required("Password must not be empty.")
            .max(50, "Password must be less than 50 characters in length.")
    });

    const initialValues = {
        userName: '',
        password: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                navigate('/auth/otp', {
                    state: {
                        userName: values.userName
                    }
                });
            }}
        >
            {({ isValid, handleSubmit, values, handleChange, handleBlur }) => (
                <form onSubmit={handleSubmit} className='w-full h-full'>
                    <div className='w-full flex flex-col items-start justify-between px-8 py-12 h-full'>
                        <div className='w-full'>
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                Welcome...
                            </h2>
                            <p className="leading-7">
                                Please enter your login credentials.
                            </p>
                        </div>
                        <div className='w-full flex flex-col'>
                            <div>
                                <Field>
                                    <FieldLabel htmlFor="userName">Username</FieldLabel>

                                    <ErrorMessage
                                        name="userName"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />

                                    <Input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        value={values.userName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your username"
                                    />
                                </Field>
                            </div>
                            <div className='mt-2'>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-sm mt-1"
                                    />

                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter your password"
                                    />
                                </Field>
                            </div>
                        </div>
                        <div className='w-full mt-10'>
                            <Button variant={'outline'} disabled={!isValid} type='submit' size={'sm'} className={'w-full'}>
                                Login
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default Login;
