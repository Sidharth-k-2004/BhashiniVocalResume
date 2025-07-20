// 'use client'

// import { useState } from 'react'

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     setMessage('')
//     setError('')

//     try {
//       const response = await fetch('http://localhost:5000/api/request-password-reset', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email })
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage(data.message || 'Password reset key sent to your email.')
//       } else {
//         setError(data.message || 'Something went wrong.')
//       }
//     } catch (err) {
//       setError('Server error. Please try again later.')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center text-purple-700">Forgot Password</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Enter your email address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
//           >
//             Send Reset Link
//           </button>
//         </form>

//         {message && (
//           <p className="mt-4 text-green-600 text-center font-medium">{message}</p>
//         )}
//         {error && (
//           <p className="mt-4 text-red-600 text-center font-medium">{error}</p>
//         )}
//       </div>
//     </div>
//   )
// }


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
