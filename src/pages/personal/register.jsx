import React, { useState } from 'react';
import Head from 'next/head';
import { Input, Button, Link, Checkbox } from '@nextui-org/react';
import Swal from 'sweetalert2';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isChecked) {
            Swal.fire('Registration Failed', 'Please accept the requirements before submitting.', 'warning');
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire('Registration Failed', 'Password and Confirm Password do not match.', 'warning');
            return;
        }

        if (!firstName || !lastName || !email || !username || !password) {
            Swal.fire('Registration Failed', 'Please fill in all fields', 'warning');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire('Registration Failed', 'Please enter a valid email address.', 'warning');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                Swal.fire({
                    title: 'Registration Success',
                    text: 'You have successfully registered.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Click To Login',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/personal/login';
                    }
                });
            } else {
                const errorData = await response.json();
                Swal.fire('Registration Failed', errorData.message || 'An error occurred during registration.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('Registration Failed', 'An unexpected error occurred. Please try again later.', 'error');
        }
    };

    return (
        <div>
            <Head>
                <title>Zismail Shop</title>
                <meta name="description" content="Create user for zismail shop" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Enter your First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                name="lastName"
                                type="text"
                                label="Last Name"
                                placeholder="Enter your Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                name="username"
                                type="text"
                                label="Username"
                                placeholder="Enter your Username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                        <div className="mb-6">
                            <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)}>
                                I accept the <Link href='/contents/requirements'>Requirements</Link>
                            </Checkbox>
                        </div>
                        <Button
                            radius="full"
                            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link href="/personal/login" color="foreground">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
