// pages/auth/signin.js
import React, { useState } from 'react';
import Head from 'next/head';
import { Input, Button, Link } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      Swal.fire('Login Failed', 'Please enter both username and password', 'warning');
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }

    try {
      setUsernameError(false);
      setPasswordError(false);

      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (res.error) {
        Swal.fire('Login Failed', res.error || 'Invalid username or password!', 'error');
      } else {
        Swal.fire({
          title: 'Login Success',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Click To Login',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = '/';
          }
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Login Failed', 'An unexpected error occurred. Please try again later.', 'error');
    }
  };

  return (
    <div>
      <Head>
        <title>Zismail Shop</title>
        <meta name="description" content="Singin user for zismail shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <Input
              name="username"
              type="text"
              label="Username"
              placeholder="Enter your Username"
              onChange={(e) => setUsername(e.target.value)}
              error={usernameError}
            />
          </div>
          <div className="mb-6">
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
            />
          </div>
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          
          <div className="mt-4 text-center">
            <Link href="/personal/register" color="foreground">
              Register
            </Link>
          </div>

          <div className="mt-2 text-center">
            <Link href="/personal/forgot" color="foreground">
              Forgot Password ?
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
