'use client';

import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1 = request, 2 = verify
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const requestResetKey = async () => {
    const res = await fetch('http://localhost:5000/api/request-password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error || 'Something went wrong');
    if (res.ok) setStep(2);
  };

  const resetPassword = async () => {
    console.log({ email, key, newPassword });
    const res = await fetch('http://localhost:5000/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, key, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message || data.error || 'Something went wrong');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-purple-700">
          {step === 1 ? 'Request Password Reset' : 'Enter Reset Key'}
        </h1>

        {step === 1 ? (
          <>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
              onClick={requestResetKey}
            >
              Send Reset Key
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter reset key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-4 py-2"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </>
        )}

        {message && <p className="text-center text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
