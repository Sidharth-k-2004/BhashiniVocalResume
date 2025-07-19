'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearMessages = () => {
    setError('');
    setMessage('');
  };

  const handleRequestReset = async () => {
    clearMessages();
    try {
      const res = await fetch('http://localhost:5000/api/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Reset code sent to your email.');
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Failed to request reset');
    }
  };

  const handleVerifyCode = async () => {
    clearMessages();
    try {
      const res = await fetch('http://localhost:5000/api/verify-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Code verified. You may now reset your password.');
      setStep(3);
    } catch (err: any) {
      setError(err.message || 'Invalid code');
    }
  };

  const handleResetPassword = async () => {
    clearMessages();
    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Password reset successfully! You can now log in.');
      setStep(1);
      setEmail('');
      setCode('');
      setNewPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && <div className="text-green-600 mb-2">{message}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}

        {step === 1 && (
          <>
            <input
              type="email"
              className="w-full border p-2 rounded mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleRequestReset}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Reset Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              placeholder="Enter the code sent to your email"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerifyCode}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Verify Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              className="w-full border p-2 rounded mb-3"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
