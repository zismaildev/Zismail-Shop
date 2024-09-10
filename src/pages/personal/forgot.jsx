import React, { useState } from 'react';
import Head from 'next/head'; // เพิ่ม Head จาก next/head
import Link from 'next/link'; // เพิ่ม Link จาก next/link
import { Input, Button } from '@nextui-org/react'; // แก้ไขให้ตรงกับ component ที่คุณใช้

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setSuccess('Check your email for reset instructions.');
      setIdentifier(''); // รีเซ็ตฟิลด์หลังส่งสำเร็จ
    } catch (error) {
      console.error(error);
      setError(error.message); // แสดงข้อความ error
    }
  };

  return (
    <div>
      <Head>
        <title>Zismail Shop - Forgot Password</title>
        <meta name="description" content="Forgot your password? Enter your email or username." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 sm:py-32 lg:px-8 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Forgot Password</h1>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* แสดงข้อความ error */}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>} {/* แสดงข้อความ success */}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                name="identifier"
                type="text"
                label="Email or Username"
                placeholder="Enter your Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full"
              type="submit"
            >
              Send Reset Link
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/personal/login" color="foreground">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;