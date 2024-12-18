import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Input, Button } from '@nextui-org/react';

const ResetPassword = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      setSuccess('Password has been reset successfully.');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Zismail Shop - Reset Password</title>
        <meta name="description" content="Reset your password." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Reset Password</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                name="password"
                type="password"
                label="New Password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
